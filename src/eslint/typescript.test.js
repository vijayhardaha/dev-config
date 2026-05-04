import { describe, it, expect } from 'vitest';

// Test suite for the ESLint TypeScript configuration module.
describe('eslint/typescript.js', () => {
  // Test that the module exports the createConfig function.
  it('should export createConfig function', async () => {
    // Dynamically import the typescript.js module to test its exports.
    const module = await import('./typescript.js');

    // Verify that createConfig is a function (used to create ESLint config for TypeScript).
    expect(typeof module.createConfig).toBe('function');
  });

  // Test that the module exports a default configuration object.
  it('should export default config', async () => {
    // Dynamically import the typescript.js module to test its exports.
    const module = await import('./typescript.js');

    // Verify that the default export is defined (should be an ESLint config object).
    expect(module.default).toBeDefined();
  });
});
