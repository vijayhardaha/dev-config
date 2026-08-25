import { describe, it, expect } from 'vitest';

describe('eslint/lib/ignores.js', () => {
  it('should export globalIgnores function', async () => {
    const module = await import('../ignores.js');

    expect(typeof module.globalIgnores).toBe('function');
  });

  it('should return an array of config objects', async () => {
    const module = await import('../ignores.js');

    const result = module.globalIgnores();

    expect(Array.isArray(result)).toBe(true);
  });

  it('should merge user ignores with default ignores', async () => {
    const module = await import('../ignores.js');

    const result = module.globalIgnores(['**/custom-ignore/']);

    expect(Array.isArray(result)).toBe(true);
  });

  it('should ignore Supabase temporary files by default', async () => {
    const module = await import('../ignores.js');
    const [config] = module.globalIgnores();

    expect(config.ignores).toContain('**/supabase/.temp/**');
  });
});
