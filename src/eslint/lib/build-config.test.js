import { describe, it, expect } from 'vitest';

// Test suite for the ESLint build-config utility module.
describe('eslint/lib/build-config.js', () => {
  // Test that the module exports the buildConfig function.
  it('should export buildConfig function', async () => {
    // Dynamically import the build-config module to test its exports.
    const module = await import('./build-config.js');

    // Verify that buildConfig is a function (used to build ESLint configs).
    expect(typeof module.buildConfig).toBe('function');
  });

  // Test that buildConfig returns an array of ESLint config objects.
  it('should return an array of config objects', async () => {
    // Dynamically import the build-config module to test its function.
    const module = await import('./build-config.js');

    // Import dependencies needed for the test.
    const { files } = await import('./files.js');

    // Call buildConfig with test parameters (JS-only files, empty options).
    const result = module.buildConfig({ files: files.withoutTs, options: {} });

    // Verify that the result is an array (ESLint expects configs as an array).
    expect(Array.isArray(result)).toBe(true);
  });

  // Test that buildConfig handles flat config arrays and objects.
  it('should handle flat config arrays and objects', async () => {
    const module = await import('./build-config.js');
    const { files } = await import('./files.js');

    // A flat config array (simulating eslint-config-next export)
    const flatConfigArray = [{ name: 'test-flat-config', plugins: {}, rules: { 'no-console': 'warn' } }];

    // A flat config object
    const flatConfigObject = { name: 'test-flat-object', plugins: {}, rules: { 'no-debugger': 'warn' } };

    const result = module.buildConfig({
      files: files.withTs,
      builtinPlugins: [flatConfigArray, flatConfigObject],
      options: {},
    });

    expect(Array.isArray(result)).toBe(true);
    // Should contain configs from the flat config array and object
    const configNames = result.filter((c) => c.name).map((c) => c.name);
    expect(configNames).toContain('test-flat-config');
    expect(configNames).toContain('test-flat-object');
  });

  // Test that buildConfig sets import-x/resolver-next when importOrder is enabled.
  it('should configure import-x/resolver-next with node resolver when importOrder is enabled', async () => {
    const module = await import('./build-config.js');
    const { files } = await import('./files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: { importOrder: true } });

    // The last config object in the array should have the resolver settings
    const configObject = result[result.length - 1];
    expect(configObject.settings).toBeDefined();
    expect(configObject.settings['import-x/resolver-next']).toBeDefined();
    expect(Array.isArray(configObject.settings['import-x/resolver-next'])).toBe(true);
    // Should at least have the node resolver
    expect(configObject.settings['import-x/resolver-next'].length).toBeGreaterThanOrEqual(1);
  });

  // Test that buildConfig omits import-x/resolver-next when importOrder is disabled.
  it('should omit import-x/resolver-next when importOrder is disabled', async () => {
    const module = await import('./build-config.js');
    const { files } = await import('./files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: { importOrder: false } });

    const configObject = result[result.length - 1];
    expect(configObject.settings).toBeDefined();
    expect(configObject.settings['import-x/resolver-next']).toBeUndefined();
  });

  // Test that buildConfig includes .gitignore patterns via includeIgnoreFile.
  it('should include .gitignore patterns from project root', async () => {
    const module = await import('./build-config.js');
    const { files } = await import('./files.js');

    const result = module.buildConfig({ files: files.withoutTs, options: {} });

    // When .gitignore exists at the project root, includeIgnoreFile adds a config with ignores.
    const hasIgnoreConfig = result.some((config) => config.ignores && config.ignores.length > 0);
    expect(hasIgnoreConfig).toBe(true);
  });
});
