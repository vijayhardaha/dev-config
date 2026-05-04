import { describe, it, expect } from 'vitest';

describe('jsconfig/index.json', () => {
  it('should be a valid JSON file', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(typeof module.default).toBe('object');
  });

  it('should have compilerOptions', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(module.default.compilerOptions).toBeDefined();
    expect(typeof module.default.compilerOptions).toBe('object');
  });

  it('should have exclude patterns', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(Array.isArray(module.default.exclude)).toBe(true);
  });
});
