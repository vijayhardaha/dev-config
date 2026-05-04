import { describe, it, expect } from 'vitest';

// Test suite for the ESLint setup utilities module.
describe('eslint/lib/setup.js', () => {
  // Test that the module exports the setup function.
  it('should export setup function', async () => {
    // Dynamically import the setup module to test its exports.
    const module = await import('./setup.js');

    // Verify that setup is a function.
    expect(typeof module.setup).toBe('function');
  });

  // Test that the module exports the commonParser object with a parser property.
  it('should export commonParser object', async () => {
    // Dynamically import the setup module to test its exports.
    const module = await import('./setup.js');

    // Verify that commonParser is an object.
    expect(typeof module.commonParser).toBe('object');

    // Verify that commonParser has a parser property defined.
    expect(module.commonParser.parser).toBeDefined();
  });
});
