/**
 * =====================================================================
 * Eslint Configuration (Flat)
 * =====================================================================
 * Purpose: Project-wide ESLint configuration for TypeScript.
 *          Enforces code quality and consistent styling.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage: npx eslint .
 * =====================================================================
 */

import { defineConfig } from 'eslint/config';

import { setup, commonIgnores, commonParser, commonRules, commonLanguageOptions, files } from './common.js';

const { compat, __dirname } = setup();

/**
 * Creates an ESLint configuration object for TypeScript projects.
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.prettier=true] - Enable Prettier integration
 * @param {boolean} [options.importOrder=true] - Enable import order rules
 * @returns {import('eslint').Linter.Config[]} ESLint configuration array
 */
export const createConfig = (options = {}) => {
  const { prettier = true, importOrder = true } = options;

  // ---- Extends Configs ----
  // Build the extends array based on enabled features
  const extendsConfigs = [
    'plugin:@typescript-eslint/recommended',
    importOrder && 'plugin:import/recommended',
    prettier && 'plugin:prettier/recommended',
  ].filter(Boolean);

  return defineConfig([
    // ---- Global Ignores ----
    ...commonIgnores,

    // ---- Extends Configs ----
    ...compat.extends(...extendsConfigs),

    {
      // ---- TypeScript Files Configuration ----
      // Apply to TypeScript files
      files: files.withTs,

      languageOptions: {
        ...commonLanguageOptions,
        ...commonParser,
        // ---- Parser Options ----
        // Configure TypeScript parser
        parserOptions: { tsconfigRootDir: __dirname },
      },

      rules: commonRules({ prettier, importOrder }),
    },
  ]);
};

export default createConfig();
