import { describe, it, expect } from 'vitest';

describe('eslint/lib/files.js', () => {
  it('should export files object with withTs and withoutTs arrays', async () => {
    const module = await import('../files.js');

    expect(typeof module.files).toBe('object');
    expect(Array.isArray(module.files.withTs)).toBe(true);
    expect(Array.isArray(module.files.withoutTs)).toBe(true);
  });

  it('should have correct file patterns', async () => {
    const module = await import('../files.js');

    expect(module.files.withTs).toContain('**/*.{js,jsx,mjs,cjs,ts,tsx}');
    expect(module.files.withoutTs).toContain('**/*.{js,jsx,mjs,cjs}');
  });
});
