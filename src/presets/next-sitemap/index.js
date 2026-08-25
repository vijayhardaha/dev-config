/**
 * =====================================================================
 * Next Sitemap Configuration
 * =====================================================================
 * Purpose: Next.js sitemap configuration for generating SEO-friendly
 *          sitemaps with robots.txt support.
 * Docs:    https://github.com/iamvishnusankar/next-sitemap
 * =====================================================================
 */

import { SITEMAP } from '../../lib/constants/sitemap.js';
import { validateUrl, validateStringArray, validateNonEmptyString } from '../../lib/utils/index.js';

/**
 * Creates a sitemap configuration object for next-sitemap.
 *
 * @param {object} [options] - Configuration options.
 * @param {string} [options.siteUrl] - Site base URL.
 * @param {string} [options.outDir] - Output directory for sitemap files.
 * @param {string[]} [options.exclude] - Paths to exclude from sitemap.
 *
 * @returns {import('next-sitemap').IConfig} Sitemap configuration object.
 *
 * @throws {Error} If required parameters are invalid.
 */
export function createSitemapConfig(options = {}) {
  const {
    siteUrl = SITEMAP.DEFAULTS.SITE_URL,
    outDir = SITEMAP.DEFAULTS.OUTPUT_DIR,
    exclude = SITEMAP.DEFAULTS.EXCLUDE_PATHS,
  } = options;

  // ---- Validation ----
  validateUrl(siteUrl, 'siteUrl');
  validateNonEmptyString(outDir, 'outDir');
  validateStringArray(exclude, 'exclude');

  // ---- Last Modified ----
  // Use current timestamp for all sitemap entries
  const lastModified = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

  return {
    // ---- Basic Settings ----
    siteUrl,
    sitemapBaseFileName: SITEMAP.DEFAULTS.SITEMAP_FILENAME,
    trailingSlash: SITEMAP.DEFAULTS.TRAILING_SLASH,

    // ---- Output Settings ----
    outDir,
    changefreq: SITEMAP.DEFAULTS.CHANGE_FREQUENCY,
    priority: SITEMAP.DEFAULTS.PRIORITY,
    exclude,

    // ---- Transform Function ----
    // Add last modified timestamp to each entry
    transform: async (_config, path) => {
      return { loc: path, changefreq: _config.changefreq, priority: _config.priority, lastmod: lastModified };
    },

    // ---- Robots.txt Generation ----
    generateRobotsTxt: SITEMAP.DEFAULTS.GENERATE_ROBOTS_TXT,
    robotsTxtOptions: {
      policies: [{ userAgent: SITEMAP.ROBOTS_TXT.USER_AGENT, allow: SITEMAP.ROBOTS_TXT.ALLOW }],
      // ---- Custom Robots.txt Transform ----
      // Remove the default Host header from generated robots.txt
      transformRobotsTxt: async (_config, robotsTxt) => {
        const hostHeader = `${SITEMAP.HEADERS.HOST}\nHost: ${siteUrl}\n\n`;
        return robotsTxt.replace(hostHeader, '');
      },
    },
  };
}

export default createSitemapConfig();
