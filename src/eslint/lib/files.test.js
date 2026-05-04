import { describe, it, expect } from 'vitest';

// Test suite for the ESLint file patterns configuration module.
describe('eslint/lib/files.js', () => {
  // Test that the module exports a files object with TypeScript and non-TypeScript file arrays.
  it('should export files object with withTs and withoutTs arrays', async () => {
    // Dynamically import the files module to test its exports.
    const module = await import('./files.js');

    // Verify that files is an object.
    expect(typeof module.files).toBe('object');

    // Verify that withTs is an array (file patterns for TypeScript files).
    expect(Array.isArray(module.files.withTs)).toBe(true);

    // Verify that withoutTs is an array (file patterns for JavaScript files).
    expect(Array.isArray(module.files.withoutTs)).toBe(true);
  });

  // Test that the file patterns are correctly defined for TypeScript and JavaScript files.
  it('should have correct file patterns', async () => {
    // Dynamically import the files module to test its exports.
    const module = await import('./files.js');

    // Verify that withTs array contains the pattern for TypeScript files.
    expect(module.files.withTs).toContain('**/*.{js,jsx,mjs,cjs,ts,tsx}');

    // Verify that withoutTs array contains the pattern for JavaScript-only files.
    expect(module.files.withoutTs).toContain('**/*.{js,jsx,mjs,cjs}');
  });
});
