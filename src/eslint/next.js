/**
 * =====================================================================
 * Eslint Configuration (Flat)
 * =====================================================================
 * Purpose: Project-wide ESLint configuration for Next.js, TypeScript, and
 *          React. Enforces code quality, accessibility, and consistent styling.
 * Docs:    https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage:   npx eslint .
 * =====================================================================
 */

import { setup, buildConfig, files } from './lib/index.js';

const { compat } = setup();

/**
 * Creates an ESLint configuration object for Next.js projects with TypeScript
 * and React support.
 *
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.prettier] - Enable Prettier integration.
 * @param {boolean} [options.react] - Enable React-specific rules.
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
  const { prettier = true, react = true, a11y = true, importOrder = true, jsdoc = true } = options;

  return buildConfig({
    compat,
    files: files.withTs,
    builtinPlugins: ['next/core-web-vitals', 'next/typescript', 'plugin:@typescript-eslint/recommended'],
    conditionalPlugins: {
      react: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
      a11y: 'plugin:jsx-a11y/recommended',
    },
    parserOptions: { ecmaFeatures: { jsx: true } },
    settings: { react: { version: 'detect' } },
    rules: {
      ...(react && {
        'react/react-in-jsx-scope': 'off',
        'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }],
      }),
    },
    typescript: true,
    options: { ...options, prettier, react, a11y, importOrder, jsdoc },
  });
};

export default createConfig();
