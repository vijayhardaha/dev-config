import { describe, it, expect } from 'vitest';

describe('eslint/lib/index.js', () => {
  it('should export files object', async () => {
    const module = await import('../index.js');

    expect(typeof module.files).toBe('object');
    expect(Array.isArray(module.files.withTs)).toBe(true);
    expect(Array.isArray(module.files.withoutTs)).toBe(true);
  });

  it('should export buildConfig function', async () => {
    const module = await import('../index.js');

    expect(typeof module.buildConfig).toBe('function');
  });
});
