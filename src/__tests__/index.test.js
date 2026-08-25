import { describe, it, expect } from 'vitest';

describe('index.js exports', () => {
  it('should export functions without requiring optional integrations', async () => {
    const module = await import('../index.js');

    expect(Array.isArray(module.eslint)).toBe(true);
    expect(typeof module.createEslintConfig).toBe('function');

    expect(typeof module.prettier).toBe('object');
    expect(typeof module.commitlint).toBe('object');
    expect(typeof module.nextSitemap).toBe('object');

    expect(typeof module.createSitemapConfig).toBe('function');

    expect(typeof module.stylelint).toBe('object');
  });
});
