/**
 * Next Sitemap configuration constants used to seed the next-sitemap
 * preset with sensible defaults.
 */

/**
 * @type {{
 *   DEFAULTS: {
 *     SITE_URL: string,
 *     OUTPUT_DIR: string,
 *     EXCLUDE_PATHS: string[],
 *     CHANGE_FREQUENCY: string,
 *     PRIORITY: number,
 *     SITEMAP_FILENAME: string,
 *     TRAILING_SLASH: boolean,
 *     GENERATE_ROBOTS_TXT: boolean
 *   },
 *   ROBOTS_TXT: { USER_AGENT: string, ALLOW: string },
 *   HEADERS: { HOST: string }
 * }}
 */
export const SITEMAP = {
  // Default values
  DEFAULTS: {
    SITE_URL: 'https://example.com',
    OUTPUT_DIR: './public',
    EXCLUDE_PATHS: ['/404', '/500'],
    CHANGE_FREQUENCY: 'weekly',
    PRIORITY: 0.7,
    SITEMAP_FILENAME: 'sitemap',
    TRAILING_SLASH: false,
    GENERATE_ROBOTS_TXT: true,
  },

  // Robots.txt configuration
  ROBOTS_TXT: { USER_AGENT: '*', ALLOW: '/' },

  // Headers
  HEADERS: { HOST: '# Host' },
};
