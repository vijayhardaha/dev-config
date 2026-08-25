import { describe, it, expect } from 'vitest';

describe('next-sitemap/index.js', () => {
  it('should export createSitemapConfig function', async () => {
    const module = await import('../index.js');

    expect(typeof module.createSitemapConfig).toBe('function');
  });

  it('should export default config object', async () => {
    const module = await import('../index.js');

    expect(typeof module.default).toBe('object');
  });

  it('should return config with siteUrl', async () => {
    const module = await import('../index.js');

    const config = module.createSitemapConfig({ siteUrl: 'https://example.com' });

    expect(config.siteUrl).toBe('https://example.com');
  });

  it('should return config with default values', async () => {
    const module = await import('../index.js');

    const config = module.createSitemapConfig();

    expect(config.siteUrl).toBe('https://example.com');
    expect(config.outDir).toBe('./public');
  });

  it('should have generateRobotsTxt enabled', async () => {
    const module = await import('../index.js');

    const config = module.createSitemapConfig();

    expect(config.generateRobotsTxt).toBe(true);
  });

  it('should remove Host header in transformRobotsTxt', async () => {
    const module = await import('../index.js');

    const config = module.createSitemapConfig({ siteUrl: 'https://example.com' });

    expect(typeof config.robotsTxtOptions.transformRobotsTxt).toBe('function');

    const mockRobotsTxt = `# Host\nHost: https://example.com\n\nUser-agent: *\nAllow: /\n`;

    const transformed = await config.robotsTxtOptions.transformRobotsTxt(config, mockRobotsTxt);

    expect(transformed).not.toContain('# Host');
    expect(transformed).not.toContain('Host: https://example.com');

    expect(transformed).toContain('User-agent: *');
    expect(transformed).toContain('Allow: /');
  });

  it('should return loc with metadata in transform', async () => {
    const module = await import('../index.js');

    const config = module.createSitemapConfig({ siteUrl: 'https://example.com' });

    const transformed = await config.transform(config, '/about/');

    expect(transformed.loc).toBe('/about/');
    expect(transformed.changefreq).toBe(config.changefreq);
    expect(transformed.priority).toBe(config.priority);

    expect(transformed.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  });
});
