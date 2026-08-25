import { describe, it, expect, beforeAll } from 'vitest';

describe('eslint/lib/rules/common.js', () => {
  let commonRules;

  beforeAll(async () => {
    const module = await import('../common.js');
    commonRules = module.commonRules;
  });

  it('should export commonRules function', () => {
    expect(typeof commonRules).toBe('function');
  });

  it('should return an object with rules', () => {
    const result = commonRules();

    expect(typeof result).toBe('object');
  });

  it('should include TypeScript rules when typescript is true', () => {
    const result = commonRules({ typescript: true });

    expect(result['@typescript-eslint/no-unused-vars']).toBeDefined();
  });

  it('should include import order rules when importOrder is true', () => {
    const result = commonRules({ importOrder: true });

    expect(result['import-x/order']).toBeDefined();
  });

  it('should include Prettier rules when prettier is true', () => {
    const result = commonRules({ prettier: true });

    expect(result['prettier/prettier']).toBeDefined();
  });

  it('should include JSDoc rules when jsdoc is true', () => {
    const result = commonRules({ jsdoc: true });

    expect(result['jsdoc/require-jsdoc']).toBeDefined();
  });

  it('should include Tailwind rules when tailwind is true', () => {
    const result = commonRules({ tailwind: true });

    expect(result['better-tailwindcss/enforce-canonical-classes']).toBeDefined();
    expect(result['better-tailwindcss/no-unnecessary-whitespace']).toBeDefined();
    expect(result['better-tailwindcss/enforce-consistent-class-order']).toBeDefined();
    expect(result['tailwindcss/no-unnecessary-arbitrary-value']).toBeDefined();
  });

  it('should configure line wrapping with the shared Prettier print width', () => {
    const result = commonRules({ tailwind: true });

    expect(result['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual(['warn', { printWidth: 120 }]);
  });

  it('should exclude Tailwind rules when tailwind is false', () => {
    const result = commonRules({ tailwind: false });

    expect(Object.keys(result).filter((rule) => rule.startsWith('better-tailwindcss/'))).toHaveLength(0);
    expect(Object.keys(result).filter((rule) => rule.startsWith('tailwindcss/'))).toHaveLength(0);
  });
});
