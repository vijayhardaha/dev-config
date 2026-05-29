/**
 * =====================================================================
 * Eslint Configuration (Flat)
 * =====================================================================
 * Purpose: Project-wide ESLint configuration for TypeScript.
 *          Enforces code quality and consistent styling.
 * Docs:    https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage:   npx eslint .
 * =====================================================================
 */

import tsEslint from 'typescript-eslint';

import { buildConfig, files } from './lib/index.js';

/**
 * Creates an ESLint configuration object for TypeScript projects.
 *
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.prettier] - Enable Prettier integration.
 * @param {boolean} [options.importOrder] - Enable import order rules.
 * @param {boolean} [options.jsdoc] - Enable JSDoc rules for public/exported APIs.
 * @param {string[]} [options.ignores] - Additional ignore patterns.
 * @param {object} [options.rules] - Additional or overridden rules.
 * @param {object} [options.settings] - Additional settings.
 * @param {string[]} [options.files] - Additional file patterns to lint.
 * @param {object} [options.languageOptions] - Additional language options.
 * @param {string[]} [options.plugins] - Additional plugin configs to extend.
 * @param {string[]} [options.globalIgnores] - Additional global ignore patterns.
 * @param {object} [options.extend] - Additional config properties to extend.
 *
 * @returns {import('eslint').Linter.Config[]} ESLint configuration array.
 */
export const createConfig = (options = {}) => {
  const { prettier = true, importOrder = true, jsdoc = true } = options;

  return buildConfig({
    files: files.withTs,
    builtinPlugins: [...tsEslint.configs.recommended],
    typescript: true,
    options: { ...options, prettier, importOrder, jsdoc },
  });
};

export default createConfig();
