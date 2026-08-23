import { describe, expect, it, vi } from 'vitest';

// Simulate the optional TypeScript import resolver being absent so the
// top-level fallback branch and its debug logging execute at load time.
vi.mock('eslint-import-resolver-typescript', () => {
  throw new Error('simulated missing dependency');
});

describe('eslint/lib/build-config.js with missing optional resolver', () => {
  it('falls back gracefully when eslint-import-resolver-typescript is missing', async () => {
    // Enable debug logging before the module is evaluated so the fallback
    // branch emits its install hint.
    process.env.DEBUG = '*';
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    // Import after the mock and DEBUG are in place.
    const buildConfig = await import('../build-config.js');

    // Verify that config building still works without the optional resolver.
    expect(typeof buildConfig.buildConfig).toBe('function');
    expect(debugSpy).toHaveBeenCalledWith(expect.stringContaining('eslint-import-resolver-typescript'));

    delete process.env.DEBUG;
  });
});
