import { describe, it, expect } from 'vitest';

// Test suite for the ESLint lib module's main entry point.
describe('eslint/lib/index.js', () => {
  // Test that the module exports the setup function.
  it('should export setup function', async () => {
    // Dynamically import the index module to test its exports.
    const module = await import('./index.js');

    // Verify that setup is a function.
    expect(typeof module.setup).toBe('function');
  });

  // Test that the module exports a files object with TypeScript and non-TypeScript file arrays.
  it('should export files object', async () => {
    // Dynamically import the index module to test its exports.
    const module = await import('./index.js');

    // Verify that files is an object.
    expect(typeof module.files).toBe('object');

    // Verify that files.withTs is an array (TypeScript file patterns).
    expect(Array.isArray(module.files.withTs)).toBe(true);

    // Verify that files.withoutTs is an array (JavaScript file patterns).
    expect(Array.isArray(module.files.withoutTs)).toBe(true);
  });

  // Test that the module exports the buildConfig function.
  it('should export buildConfig function', async () => {
    // Dynamically import the index module to test its exports.
    const module = await import('./index.js');

    // Verify that buildConfig is a function.
    expect(typeof module.buildConfig).toBe('function');
  });
});
