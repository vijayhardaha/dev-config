/**
 * =====================================================================
 * Eslint Configuration (Flat)
 * =====================================================================
 * Purpose: Project-wide ESLint configuration for React with TypeScript.
 *          Enforces code quality, accessibility, and consistent styling.
 * Docs:    https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage:   npx eslint .
 * =====================================================================
 */

import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooks from 'eslint-plugin-react-hooks';
import tsEslint from 'typescript-eslint';

import { buildConfig, files } from './lib/index.js';

/**
 * Creates an ESLint configuration object for React projects with TypeScript
 * support.
 *
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.prettier] - Enable Prettier integration.
 * @param {boolean} [options.a11y] - Enable accessibility rules.
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
  const { prettier = true, a11y = true, importOrder = true, jsdoc = true } = options;

  return buildConfig({
    files: [...files.withTs, ...(options.files || [])],
    builtinPlugins: [
      { ...reactRecommended, files: [...files.withTs, ...(options.files || [])] },
      { ...reactHooks.configs.flat.recommended, files: [...files.withTs, ...(options.files || [])] },
      ...tsEslint.configs.recommended,
    ],
    centralPlugins: { react: reactPlugin, 'react-hooks': reactHooks, '@typescript-eslint': tsEslint.plugin },
    conditionalPlugins: {
      a11y: { ...jsxA11y.flatConfigs.recommended, files: [...files.withTs, ...(options.files || [])] },
    },
    parserOptions: { ecmaFeatures: { jsx: true } },
    settings: { react: { version: 'detect' } },
    rules: { 'react/react-in-jsx-scope': 'off', 'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }] },
    typescript: true,
    options: { ...options, prettier, a11y, importOrder, jsdoc },
  });
};

export default createConfig();
