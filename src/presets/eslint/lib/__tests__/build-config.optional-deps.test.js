import { describe, expect, it, vi } from 'vitest';

// Simulate the optional TypeScript import resolver being absent so the
// top-level fallback branch and its debug logging execute at load time.
vi.mock('eslint-import-resolver-typescript', () => {
  throw new Error('simulated missing dependency');
});

describe('eslint/lib/build-config.js with missing optional resolver', () => {
  it('falls back gracefully when eslint-import-resolver-typescript is missing', async () => {
    process.env.DEBUG = '*';
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    // Import after the mock and DEBUG are in place.
    const buildConfigModule = await import('../build-config.js');

    expect(typeof buildConfigModule.buildConfig).toBe('function');
    expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('eslint-import-resolver-typescript'));

    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });
    expect(result.at(-1).settings['import-x/resolver-next']).toHaveLength(1);

    delete process.env.DEBUG;
  });

  it('stays silent without DEBUG when the resolver is missing', async () => {
    delete process.env.DEBUG;
    vi.resetModules();
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    debugSpy.mockClear();

    // Re-import so top-level fallback branches run again under this env.
    const buildConfigModule = await import('../build-config.js');

    expect(debugSpy).not.toHaveBeenCalled();
    expect(typeof buildConfigModule.buildConfig).toBe('function');
  });
});
