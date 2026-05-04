import { describe, it, expect } from 'vitest';

describe('next-sitemap/index.js', () => {
  it('should export createSitemapConfig function', async () => {
    const module = await import('./index.js');
    expect(typeof module.createSitemapConfig).toBe('function');
  });

  it('should export default config object', async () => {
    const module = await import('./index.js');
    expect(typeof module.default).toBe('object');
  });

  it('should return config with siteUrl', async () => {
    const module = await import('./index.js');
    const config = module.createSitemapConfig({ siteUrl: 'https://example.com' });
    expect(config.siteUrl).toBe('https://example.com');
  });

  it('should return config with default values', async () => {
    const module = await import('./index.js');
    const config = module.createSitemapConfig();
    expect(config.siteUrl).toBe('https://example.com');
    expect(config.outDir).toBe('./public');
  });

  it('should have generateRobotsTxt enabled', async () => {
    const module = await import('./index.js');
    const config = module.createSitemapConfig();
    expect(config.generateRobotsTxt).toBe(true);
  });
});
