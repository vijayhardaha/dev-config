/**
 * =====================================================================
 * Eslint Configuration (Flat)
 * =====================================================================
 * Purpose: Project-wide ESLint configuration for Next.js, TypeScript, and
 *          React. Enforces code quality, accessibility, and consistent styling.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage: npx eslint .
 * =====================================================================
 */

import { defineConfig } from 'eslint/config';

import { setup, commonIgnores, commonParser, commonRules, commonLanguageOptions, files } from './common.js';

const { compat } = setup();

/**
 * Creates an ESLint configuration object for Next.js projects with TypeScript
 * and React support.
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.prettier=true] - Enable Prettier integration
 * @param {boolean} [options.react=true] - Enable React-specific rules
 * @param {boolean} [options.a11y=true] - Enable accessibility rules
 * @param {boolean} [options.importOrder=true] - Enable import order rules
 * @returns {import('eslint').Linter.Config[]} ESLint configuration array
 */
export const createConfig = (options = {}) => {
  const { prettier = true, react = true, a11y = true, importOrder = true } = options;

  // ---- Extends Configs ----
  // Build the extends array based on enabled features
  const extendsConfigs = [
    'plugin:import/recommended',
    'next/core-web-vitals',
    'next/typescript',
    react && 'plugin:react/recommended',
    react && 'plugin:react-hooks/recommended',
    a11y && 'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
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
        // Configure TypeScript parser with React JSX support
        parserOptions: { ecmaFeatures: { jsx: true }, tsconfigRootDir: process.cwd() },
      },

      // ---- React Settings ----
      ...(react && { settings: { react: { version: 'detect' } } }),

      rules: {
        // ---- React Rules ----
        // Disable React import requirement (Next.js handles this)
        ...(react && { 'react/react-in-jsx-scope': 'off' }),
        // Allow JSX and global attributes
        ...(react && { 'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }] }),
        // ---- Common Rules ----
        // Apply shared rules
        ...commonRules({ prettier, importOrder }),
      },
    },
  ]);
};

export default createConfig();
