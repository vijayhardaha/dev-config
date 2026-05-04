import { describe, it, expect } from 'vitest';

// Test suite for the Commitlint configuration module.
describe('commitlint/index.js', () => {
  // Test that the module exports a default configuration object.
  it('should export default config object', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that the default export is an object (Commitlint config).
    expect(typeof module.default).toBe('object');
  });

  // Test that the config has an extends array (inherits from base configs).
  it('should have extends property', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that extends is an array (list of config files to extend).
    expect(Array.isArray(module.default.extends)).toBe(true);
  });

  // Test that the config has a rules object (contains Commitlint rules).
  it('should have rules property', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that rules is an object (key-value pairs of rule configurations).
    expect(typeof module.default.rules).toBe('object');
  });

  // Test that the header-max-length rule is defined (commit header length limit).
  it('should have header-max-length rule', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that the header-max-length rule exists in the config.
    expect(module.default.rules['header-max-length']).toBeDefined();
  });

  // Test that the scope-case rule is defined (enforces case style for commit scopes).
  it('should have scope-case rule', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that the scope-case rule exists in the config.
    expect(module.default.rules['scope-case']).toBeDefined();
  });
});
