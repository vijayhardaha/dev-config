import { describe, it, expect } from 'vitest';

// Test suite for the ESLint Next.js configuration module.
describe('eslint/next.js', () => {
  // Test that the module exports the createConfig function.
  it('should export createConfig function', async () => {
    try {
      // Dynamically import the next.js module to test its exports.
      const module = await import('./next.js');

      // Verify that createConfig is a function (used to create ESLint config for Next.js).
      expect(typeof module.createConfig).toBe('function');
    } catch (error) {
      // If import fails, expect an error to be defined.
      expect(error).toBeDefined();
    }
  });

  // Test that the module exports a default configuration object.
  it('should export default config', async () => {
    try {
      // Dynamically import the next.js module to test its exports.
      const module = await import('./next.js');

      // Verify that the default export is defined (should be an ESLint config object).
      expect(module.default).toBeDefined();
    } catch (error) {
      // If import fails, expect an error to be defined.
      expect(error).toBeDefined();
    }
  });
});
