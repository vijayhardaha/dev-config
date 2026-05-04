import { describe, it, expect } from 'vitest';

// Test suite for the JavaScript base configuration file.
describe('jsconfig/index.json', () => {
  // Test that the jsconfig file is valid JSON and exports an object.
  it('should be a valid JSON file', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that the default export is an object (valid JSON object).
    expect(typeof module.default).toBe('object');
  });

  // Test that the jsconfig contains compilerOptions.
  it('should have compilerOptions', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that compilerOptions property exists on the config object.
    expect(module.default.compilerOptions).toBeDefined();

    // Verify that compilerOptions is an object.
    expect(typeof module.default.compilerOptions).toBe('object');
  });

  // Test that the jsconfig has exclude patterns defined as an array.
  it('should have exclude patterns', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that exclude property exists and is an array (list of file patterns to exclude).
    expect(Array.isArray(module.default.exclude)).toBe(true);
  });
});
