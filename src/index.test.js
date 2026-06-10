import { describe, it, expect } from 'vitest';

// Test suite for the main index.js exports.
describe('index.js exports', () => {
  // Test that all expected functions and objects are exported from the module.
  it('should export functions without requiring optional integrations', async () => {
    // Dynamically import the module to test its exports.
    const module = await import('./index.js');

    // Verify base ESLint exports are available without optional integrations.
    expect(Array.isArray(module.eslint)).toBe(true);
    expect(typeof module.createEslintConfig).toBe('function');

    // Verify config objects are exported.
    expect(typeof module.prettier).toBe('object');
    expect(typeof module.commitlint).toBe('object');
    expect(typeof module.nextSitemap).toBe('object');

    // Verify sitemap config function is exported.
    expect(typeof module.createSitemapConfig).toBe('function');

    // Verify Stylelint config object is exported.
    expect(typeof module.stylelint).toBe('object');
  });
});
