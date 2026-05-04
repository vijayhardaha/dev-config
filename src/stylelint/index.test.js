import { describe, it, expect } from 'vitest';

// Test suite for the Stylelint configuration module.
describe('stylelint/index.js', () => {
  // Test that the module exports a default configuration object.
  it('should export default config object', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that the default export is an object (Stylelint config).
    expect(typeof module.default).toBe('object');
  });

  // Test that the config has an extends array (inherits from base configs).
  it('should have extends property', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that extends is an array (list of config files to extend).
    expect(Array.isArray(module.default.extends)).toBe(true);
  });

  // Test that the config has a plugins array (contains Stylelint plugins).
  it('should have plugins property', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that plugins is an array (list of Stylelint plugins).
    expect(Array.isArray(module.default.plugins)).toBe(true);
  });

  // Test that the config has a rules object (contains Stylelint rules).
  it('should have rules property', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that rules is an object (key-value pairs of rule configurations).
    expect(typeof module.default.rules).toBe('object');
  });

  // Test that specific rules are disabled (set to null).
  it('should have disabled rules', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('./index.js');

    // Verify that selector-class-pattern rule is disabled (null).
    expect(module.default.rules['selector-class-pattern']).toBeNull();

    // Verify that selector-id-pattern rule is disabled (null).
    expect(module.default.rules['selector-id-pattern']).toBeNull();
  });
});
