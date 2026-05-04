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
    const { setup } = await import('./setup.js');
    const { files } = await import('./files.js');
    const { compat } = setup();

    // Call buildConfig with test parameters (compat, JS-only files, empty options).
    const result = module.buildConfig({ compat, files: files.withoutTs, options: {} });

    // Verify that the result is an array (ESLint expects configs as an array).
    expect(Array.isArray(result)).toBe(true);
  });
});
