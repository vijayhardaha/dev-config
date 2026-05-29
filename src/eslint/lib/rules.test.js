import { describe, it, expect, beforeAll } from 'vitest';

describe('eslint/lib/rules.js', () => {
  let commonRules;

  beforeAll(async () => {
    const module = await import('./rules.js');
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
});
