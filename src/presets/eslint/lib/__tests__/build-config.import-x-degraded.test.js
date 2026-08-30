import { describe, expect, it, vi } from 'vitest';

// Simulates both degraded eslint-plugin-import-x states selected per test:
// 'missing' = package absent entirely, 'outdated' = old 4.x release that
// ships flatConfigs but not createNodeResolver. Lives in its own file
// because `vi.mock` is hoisted and applies to the entire test module.
const mockState = vi.hoisted(() => ({ mode: 'missing' }));

vi.mock('eslint-plugin-import-x', async (importOriginal) => {
  if (mockState.mode === 'missing') {
    throw new Error('simulated missing dependency');
  }

  const actual = await importOriginal();
  return { ...actual, createNodeResolver: undefined };
});

describe('eslint/lib/build-config.js with degraded eslint-plugin-import-x', () => {
  it('falls back gracefully when eslint-plugin-import-x is missing', async () => {
    mockState.mode = 'missing';
    vi.resetModules();
    process.env.DEBUG = '*';
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    // Import after the mock, mode, and DEBUG are in place.
    const buildConfigModule = await import('../build-config.js');

    expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('eslint-plugin-import-x'));

    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });
    const mainConfig = result.at(-1);

    expect(mainConfig.settings['import-x/resolver-next']).toBeUndefined();
    expect(mainConfig.rules['import-x/order']).toBeUndefined();

    debugSpy.mockRestore();
    delete process.env.DEBUG;
  });

  it('stays silent without DEBUG when eslint-plugin-import-x is missing', async () => {
    mockState.mode = 'missing';
    vi.resetModules();
    delete process.env.DEBUG;
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    debugSpy.mockClear();

    const buildConfigModule = await import('../build-config.js');

    expect(debugSpy).not.toHaveBeenCalled();

    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });
    expect(result.at(-1).rules['import-x/order']).toBeUndefined();
  });

  it('keeps order rules but skips the resolver on old 4.x without createNodeResolver', async () => {
    mockState.mode = 'outdated';
    vi.resetModules();
    process.env.DEBUG = '*';
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    const buildConfigModule = await import('../build-config.js');

    expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('createNodeResolver'));

    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });
    const mainConfig = result.at(-1);

    expect(mainConfig.settings['import-x/resolver-next']).toBeUndefined();
    expect(mainConfig.rules['import-x/order']).toBeDefined();

    debugSpy.mockRestore();
    delete process.env.DEBUG;
  });
});
