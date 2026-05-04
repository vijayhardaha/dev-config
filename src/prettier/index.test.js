import { describe, it, expect } from 'vitest';

// Test suite for the Prettier configuration.
describe('prettier/index.js', () => {
  // Test that the module exports a default config object.
  it('should export default config object', async () => {
    // Dynamically import the rules module to test its function.
    const module = await import('./index.js');

    // Verify default export is an object.
    expect(typeof module.default).toBe('object');
  });

  // Test that the config has the correct Prettier properties.
  it('should have correct Prettier configuration properties', async () => {
    // Dynamically import the rules module to test its function.
    const module = await import('./index.js');
    const config = module.default;

    // Verify basic formatting options.
    expect(config.printWidth).toBe(120);
    expect(config.tabWidth).toBe(2);
    expect(config.useTabs).toBe(false);
    expect(config.semi).toBe(true);
    expect(config.singleQuote).toBe(false);
    expect(config.trailingComma).toBe('es5');
  });

  // Test that the config has overrides for different file types.
  it('should have overrides for different file types', async () => {
    // Dynamically import the rules module to test its function.
    const module = await import('./index.js');
    const config = module.default;

    // Verify overrides array exists and has entries.
    expect(Array.isArray(config.overrides)).toBe(true);
    expect(config.overrides.length).toBeGreaterThan(0);
  });
});
