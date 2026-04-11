/**
 * =====================================================================.
 * Eslint Configuration (Flat)
 * =====================================================================.
 * Purpose: Project-wide ESLint configuration for JavaScript.
 *          Enforces code quality and consistent styling.
 * Docs:    https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage:   npx eslint .
 * =====================================================================.
 */

import { defineConfig } from 'eslint/config';

import { setup, commonIgnores, commonRules, commonLanguageOptions, files } from './common.js';

const { compat } = setup();

/**
 * Creates an ESLint configuration object with optional features.
 *
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.prettier] - Enable Prettier integration.
 * @param {boolean} [options.importOrder] - Enable import order rules.
 * @param {boolean} [options.jsdoc] - Enable JSDoc rules for public/exported APIs.
 *
 * @returns {import('eslint').Linter.Config[]} ESLint configuration array.
 */
export const createConfig = (options = {}) => {
  const { prettier = true, importOrder = true, jsdoc = true } = options;

  // ---- Extends Configs ----
  // Build the extends array based on enabled features
  const extendsConfigs = [
    importOrder && 'plugin:import/recommended',
    jsdoc && 'plugin:jsdoc/recommended',
    prettier && 'plugin:prettier/recommended',
  ].filter(Boolean);

  return defineConfig([
    // ---- Global Ignores ----
    ...commonIgnores,

    // ---- Extends Configs ----
    ...compat.extends(...extendsConfigs),

    {
      // ---- JavaScript Files Configuration ----
      // Apply to JavaScript files without TypeScript
      files: files.withoutTs,

      // ---- Language Options ----
      languageOptions: commonLanguageOptions,

      // ---- Settings ----
      settings: { ...(importOrder && { 'import/resolver': { typescript: {} } }) },

      // ---- Rules ----
      rules: {
        // ---- Unused Variables Rule ----
        // Report unused variables for JavaScript files
        'no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            caughtErrors: 'all',
          },
        ],
        // ---- Common Rules ----
        // Apply shared rules based on options
        ...commonRules({ prettier, importOrder, typescript: false, jsdoc }),
      },
    },
  ]);
};

export default createConfig();
