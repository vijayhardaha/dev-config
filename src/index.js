/**
 * =====================================================================
 * Dev Configurations Index
 * =====================================================================
 * Purpose: Central index file that re-exports all configuration presets
 *          for easy consumption by root-level config files.
 * Docs: https://github.com/vijayhardaha/dev-config
 * =====================================================================
 */

/**
 * ESLint configuration for JavaScript files.
 *
 * @type {import('eslint').Linter.Config[]}
 */
export { default as eslint, createConfig as createEslintConfig } from './presets/eslint/javascript.js';

/**
 * Prettier configuration.
 *
 * @type {import('prettier').Config}
 */
export { default as prettier } from './presets/prettier/index.js';

/**
 * Commitlint configuration.
 *
 * @type {import('@commitlint/types').UserConfig}
 */
export { default as commitlint } from './presets/commitlint/index.js';

/**
 * Next.js sitemap configuration factory.
 *
 * @type {typeof import('./presets/next-sitemap/index.js').createSitemapConfig}
 */
export { createSitemapConfig } from './presets/next-sitemap/index.js';

/**
 * Stylelint configuration.
 *
 * @type {import('stylelint').Config}
 */
export { default as stylelint } from './presets/stylelint/index.js';
