/**
 * =====================================================================
 * Dev Configurations Index
 * =====================================================================
 * Purpose: Central index file that re-exports all configuration presets
 *          for easy consumption by root-level config files.
 * Docs: https://github.com/vijay/repositories/projects/dev-config
 * =====================================================================
 */

/**
 * ESLint configuration for JavaScript files.
 *
 * @type {import('eslint').Linter.Config}
 */
export { default as eslint, createConfig as createEslintConfig } from './eslint/index.js';

/**
 * Prettier configuration.
 *
 * @type {import('prettier').Config}
 */
export { default as prettier } from './prettier/index.js';

/**
 * Commitlint configuration.
 *
 * @type {import('@commitlint/types').UserConfig}
 */
export { default as commitlint } from './commitlint/index.js';

/**
 * Next.js sitemap configuration.
 *
 * @type {import('next-sitemap').IConfig}
 */
export { default as nextSitemap, createSitemapConfig } from './next-sitemap/index.js';

/**
 * Stylelint configuration.
 *
 * @type {import('stylelint').Config}
 */
export { default as stylelint } from './stylelint/index.js';
