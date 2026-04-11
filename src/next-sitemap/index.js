/**
 * =====================================================================.
 * Next Sitemap Configuration
 * =====================================================================.
 * Purpose: Next.js sitemap configuration for generating SEO-friendly
 *          sitemaps with robots.txt support.
 * Docs:    https://github.com/iamvishnusankar/next-sitemap
 * =====================================================================.
 */

/**
 * Creates a sitemap configuration object for next-sitemap.
 *
 * @param {object} [options] - Configuration options.
 * @param {string} [options.siteUrl] - Site base URL.
 * @param {string} [options.outDir] - Output directory for sitemap files.
 * @param {string[]} [options.exclude] - Paths to exclude from sitemap.
 *
 * @returns {import('next-sitemap').IConfig} Sitemap configuration object.
 */
export function createSitemapConfig(options = {}) {
  const { siteUrl = 'https://example.com', outDir = './public', exclude = ['/404', '/500'] } = options;

  // ---- Last Modified ----
  // Use current timestamp for all sitemap entries
  const lastModified = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

  return {
    // ---- Basic Settings ----
    siteUrl,
    sitemapBaseFileName: 'sitemap',
    trailingSlash: false,

    // ---- Output Settings ----
    outDir,
    changefreq: 'weekly',
    priority: 0.7,
    exclude,

    // ---- Transform Function ----
    // Add last modified timestamp to each entry
    transform: async (_config, path) => {
      return { loc: path, changefreq: _config.changefreq, priority: _config.priority, lastmod: lastModified };
    },

    // ---- Robots.txt Generation ----
    generateRobotsTxt: true,
    robotsTxtOptions: {
      policies: [{ userAgent: '*', allow: '/' }],
      // ---- Custom Robots.txt Transform ----
      // Remove the default Host header from generated robots.txt
      transformRobotsTxt: async (_config, robotsTxt) => {
        const hostHeader = `# Host\nHost: ${siteUrl}\n\n`;
        return robotsTxt.replace(hostHeader, '');
      },
    },
  };
}

export default createSitemapConfig();
