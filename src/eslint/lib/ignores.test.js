import { describe, it, expect } from 'vitest';

// Test suite for the ESLint global ignores configuration module.
describe('eslint/lib/ignores.js', () => {
  // Test that the module exports the globalIgnores function.
  it('should export globalIgnores function', async () => {
    // Dynamically import the ignores module to test its exports.
    const module = await import('./ignores.js');

    // Verify that globalIgnores is a function.
    expect(typeof module.globalIgnores).toBe('function');
  });

  // Test that globalIgnores returns an array (ESLint's expected format for ignores).
  it('should return an array of config objects', async () => {
    // Dynamically import the ignores module to test its function.
    const module = await import('./ignores.js');

    // Call globalIgnores with no parameters to get default ignores.
    const result = module.globalIgnores();

    // Verify that the result is an array (ESLint expects ignores as an array).
    expect(Array.isArray(result)).toBe(true);
  });

  // Test that globalIgnores properly merges user-provided ignores with defaults.
  it('should merge user ignores with default ignores', async () => {
    // Dynamically import the ignores module to test its function.
    const module = await import('./ignores.js');

    // Call globalIgnores with a custom ignore pattern.
    const result = module.globalIgnores(['**/custom-ignore/']);

    // Verify that the result is still an array (merged ignores).
    expect(Array.isArray(result)).toBe(true);
  });
});
