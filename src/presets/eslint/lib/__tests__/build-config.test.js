import { describe, it, expect } from 'vitest';

describe('eslint/lib/build-config.js', () => {
  it('should export buildConfig function', async () => {
    const module = await import('../build-config.js');

    expect(typeof module.buildConfig).toBe('function');
  });

  it('should return an array of config objects', async () => {
    const module = await import('../build-config.js');
    const { files } = await import('../config/files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: {} });

    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle flat config arrays and objects', async () => {
    const module = await import('../build-config.js');
    const { files } = await import('../config/files.js');

    const flatConfigArray = [{ name: 'test-flat-config', plugins: {}, rules: { 'no-console': 'warn' } }];
    const flatConfigObject = { name: 'test-flat-object', plugins: {}, rules: { 'no-debugger': 'warn' } };

    const result = module.buildConfig({
      files: files.withTs,
      builtinPlugins: [flatConfigArray, flatConfigObject],
      options: {},
    });

    expect(Array.isArray(result)).toBe(true);
    const configNames = result.filter((c) => c.name).map((c) => c.name);
    expect(configNames).toContain('test-flat-config');
    expect(configNames).toContain('test-flat-object');
  });

  it('should configure import-x/resolver-next with node resolver when importOrder is enabled', async () => {
    const module = await import('../build-config.js');
    const { files } = await import('../config/files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: { importOrder: true } });

    const configObject = result[result.length - 1];
    expect(configObject.settings).toBeDefined();
    expect(configObject.settings['import-x/resolver-next']).toBeDefined();
    expect(Array.isArray(configObject.settings['import-x/resolver-next'])).toBe(true);
    expect(configObject.settings['import-x/resolver-next'].length).toBeGreaterThanOrEqual(1);
  });

  it('should omit import-x/resolver-next when importOrder is disabled', async () => {
    const module = await import('../build-config.js');
    const { files } = await import('../config/files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: { importOrder: false } });

    const configObject = result[result.length - 1];
    expect(configObject.settings).toBeDefined();
    expect(configObject.settings['import-x/resolver-next']).toBeUndefined();
  });

  it('should include .gitignore patterns from project root', async () => {
    const module = await import('../build-config.js');
    const { files } = await import('../config/files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: {} });

    const hasIgnoreConfig = result.some((config) => config.ignores && config.ignores.length > 0);
    expect(hasIgnoreConfig).toBe(true);
  });
});
