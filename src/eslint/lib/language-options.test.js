import { describe, it, expect } from 'vitest';

// Test suite for the ESLint language options configuration module.
describe('eslint/lib/language-options.js', () => {
  // Test that the module exports the commonLanguageOptions object.
  it('should export commonLanguageOptions object', async () => {
    // Dynamically import the language-options module to test its exports.
    const module = await import('./language-options.js');

    // Verify that commonLanguageOptions is an object.
    expect(typeof module.commonLanguageOptions).toBe('object');
  });

  // Test that the exported language options have the correct properties.
  it('should have correct language options properties', async () => {
    // Dynamically import the language-options module to test its exports.
    const module = await import('./language-options.js');

    // Verify that ecmaVersion is set to 'latest' (ESLint's latest ECMAScript version).
    expect(module.commonLanguageOptions.ecmaVersion).toBe('latest');

    // Verify that sourceType is set to 'module' (ES modules).
    expect(module.commonLanguageOptions.sourceType).toBe('module');

    // Verify that globals is an object (containing global variable definitions).
    expect(typeof module.commonLanguageOptions.globals).toBe('object');
  });
});
