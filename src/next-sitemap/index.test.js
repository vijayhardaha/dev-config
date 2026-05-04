import { describe, it, expect } from 'vitest';

// Test suite for next-sitemap module's main entry point.
describe('next-sitemap/index.js', () => {
  // Test that the module exports the createSitemapConfig function.
  it('should export createSitemapConfig function', async () => {
    // Dynamically import the module to test its exports.
    const module = await import('./index.js');

    // Verify that createSitemapConfig is a function.
    expect(typeof module.createSitemapConfig).toBe('function');
  });

  // Test that the module exports a default config object.
  it('should export default config object', async () => {
    // Dynamically import the module to test its exports.
    const module = await import('./index.js');

    // Verify that the default export is an object.
    expect(typeof module.default).toBe('object');
  });

  // Test that createSitemapConfig returns config with provided siteUrl.
  it('should return config with siteUrl', async () => {
    // Dynamically import the module to test its function.
    const module = await import('./index.js');

    // Call createSitemapConfig with a siteUrl parameter.
    const config = module.createSitemapConfig({ siteUrl: 'https://example.com' });

    // Verify that the returned config contains the provided siteUrl.
    expect(config.siteUrl).toBe('https://example.com');
  });

  // Test that createSitemapConfig returns config with default values when no params provided.
  it('should return config with default values', async () => {
    // Dynamically import the module to test its function.
    const module = await import('./index.js');

    // Call createSitemapConfig without parameters to get defaults.
    const config = module.createSitemapConfig();

    // Verify default siteUrl and outDir values.
    expect(config.siteUrl).toBe('https://example.com');
    expect(config.outDir).toBe('./public');
  });

  // Test that generateRobotsTxt is enabled by default in the config.
  it('should have generateRobotsTxt enabled', async () => {
    // Dynamically import the module to test its function.
    const module = await import('./index.js');

    // Call createSitemapConfig to get default config.
    const config = module.createSitemapConfig();

    // Verify that generateRobotsTxt is enabled by default.
    expect(config.generateRobotsTxt).toBe(true);
  });
});
