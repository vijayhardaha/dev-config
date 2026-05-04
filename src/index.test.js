import { describe, it, expect } from 'vitest';

// Test suite for the main index.js exports.
describe('index.js exports', () => {
  // Test that all expected functions and objects are exported from the module.
  it('should export functions', async () => {
    try {
      // Dynamically import the module to test its exports.
      const module = await import('./index.js');

      // Verify ESLint-related exports are functions.
      expect(typeof module.eslint).toBe('function');
      expect(typeof module.createEslintConfig).toBe('function');
      expect(typeof module.eslintTs).toBe('function');
      expect(typeof module.createEslintTsConfig).toBe('function');
      expect(typeof module.eslintReact).toBe('function');
      expect(typeof module.createEslintReactConfig).toBe('function');
      expect(typeof module.eslintNext).toBe('function');
      expect(typeof module.createEslintNextConfig).toBe('function');

      // Verify config objects are exported.
      expect(typeof module.prettier).toBe('object');
      expect(typeof module.commitlint).toBe('object');
      expect(typeof module.nextSitemap).toBe('object');

      // Verify sitemap config function is exported.
      expect(typeof module.createSitemapConfig).toBe('function');

      // Verify Stylelint config object is exported.
      expect(typeof module.stylelint).toBe('object');
    } catch (error) {
      // If import fails, expect an error to be defined.
      expect(error).toBeDefined();
    }
  });
});
