import { describe, it, expect, beforeAll } from 'vitest';

// Test suite for the ESLint rules configuration module.
describe('eslint/lib/rules.js', () => {
  let commonRules;

  // Module-level import before tests to reduce duplication.
  beforeAll(async () => {
    const module = await import('../rules.js');
    commonRules = module.commonRules;
  });

  // Test that the module exports the commonRules function.
  it('should export commonRules function', () => {
    // Verify that commonRules is a function.
    expect(typeof commonRules).toBe('function');
  });

  // Test that commonRules returns an object containing ESLint rules.
  it('should return an object with rules', () => {
    // Call commonRules with no options to get base rules.
    const result = commonRules();

    // Verify that the result is an object (ESLint rules config).
    expect(typeof result).toBe('object');
  });

  // Test that TypeScript rules are included when typescript option is true.
  it('should include TypeScript rules when typescript is true', () => {
    // Call commonRules with typescript option enabled.
    const result = commonRules({ typescript: true });

    // Verify that a TypeScript-specific rule is present in the config.
    expect(result['@typescript-eslint/no-unused-vars']).toBeDefined();
  });

  // Test that import order rules are included when importOrder option is true.
  it('should include import order rules when importOrder is true', () => {
    // Call commonRules with importOrder option enabled.
    const result = commonRules({ importOrder: true });

    // Verify that the import-x/order rule is present in the config.
    expect(result['import-x/order']).toBeDefined();
  });

  // Test that Prettier rules are included when prettier option is true.
  it('should include Prettier rules when prettier is true', () => {
    // Call commonRules with prettier option enabled.
    const result = commonRules({ prettier: true });

    // Verify that the prettier/prettier rule is present in the config.
    expect(result['prettier/prettier']).toBeDefined();
  });

  // Test that JSDoc rules are included when jsdoc option is true.
  it('should include JSDoc rules when jsdoc is true', () => {
    // Call commonRules with jsdoc option enabled.
    const result = commonRules({ jsdoc: true });

    // Verify that the jsdoc/require-jsdoc rule is present in the config.
    expect(result['jsdoc/require-jsdoc']).toBeDefined();
  });

  // Test that Tailwind rules are included when tailwind option is true.
  it('should include Tailwind rules when tailwind is true', () => {
    // Call commonRules with tailwind option enabled.
    const result = commonRules({ tailwind: true });

    // Verify that the Tailwind canonicalization rule is present in the config.
    expect(result['better-tailwindcss/enforce-canonical-classes']).toBeDefined();

    // Verify that the Tailwind whitespace cleanup rule is present in the config.
    expect(result['better-tailwindcss/no-unnecessary-whitespace']).toBeDefined();

    // Verify that the Tailwind ordering rule is present in the config.
    expect(result['better-tailwindcss/enforce-consistent-class-order']).toBeDefined();

    // Verify that the Tailwind arbitrary value replacement rule is present in the config.
    expect(result['tailwindcss/no-unnecessary-arbitrary-value']).toBeDefined();
  });

  // Test that line wrapping aligns with the shared Prettier print width.
  it('should configure line wrapping with the shared Prettier print width', () => {
    // Call commonRules with tailwind option enabled.
    const result = commonRules({ tailwind: true });

    // Verify that the wrapping rule uses the shared print width constant.
    expect(result['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual(['warn', { printWidth: 120 }]);
  });

  // Test that Tailwind rules are excluded when tailwind option is false.
  it('should exclude Tailwind rules when tailwind is false', () => {
    // Call commonRules with tailwind option disabled.
    const result = commonRules({ tailwind: false });

    // Verify that no better-tailwindcss rules are present in the config.
    expect(Object.keys(result).filter((rule) => rule.startsWith('better-tailwindcss/'))).toHaveLength(0);

    // Verify that no tailwindcss rules are present in the config.
    expect(Object.keys(result).filter((rule) => rule.startsWith('tailwindcss/'))).toHaveLength(0);
  });
});
