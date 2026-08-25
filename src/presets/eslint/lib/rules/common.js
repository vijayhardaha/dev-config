import { jsdocRules } from './jsdoc.js';
import { tailwindRules } from './tailwind.js';

/**
 * Creates TypeScript-specific rules.
 *
 * @param {boolean} [typescript] - Enable TypeScript rules.
 *
 * @returns {object} TypeScript ESLint rules object.
 */
const tsRules = (typescript = true) =>
  typescript
    ? {
        '@typescript-eslint/no-unused-vars': [
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
      }
    : {};

/**
 * Creates Prettier formatting rules.
 *
 * @param {boolean} [prettier] - Enable Prettier rules.
 *
 * @returns {object} Prettier ESLint rules object.
 */
const prettierRules = (prettier = true) => (prettier ? { 'prettier/prettier': 'warn' } : {});

/**
 * Creates import order rules.
 *
 * @param {boolean} [importOrder] - Enable import order rules.
 *
 * @returns {object} Import order ESLint rules object.
 */
const importOrderRules = (importOrder = true) =>
  importOrder
    ? {
        'import-x/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object'],
            pathGroups: [
              { pattern: 'react', group: 'external', position: 'before' },
              { pattern: '@/**', group: 'internal', position: 'after' },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            alphabetize: { order: 'asc', caseInsensitive: true },
            'newlines-between': 'always',
            warnOnUnassignedImports: true,
          },
        ],
      }
    : {};

/**
 * Creates a rules object based on the provided options.
 *
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.typescript] - Enable TypeScript-specific rules.
 * @param {boolean} [options.importOrder] - Enable import order rules.
 * @param {boolean} [options.prettier] - Enable Prettier integration.
 * @param {boolean} [options.jsdoc] - Enable JSDoc rules for public/exported APIs.
 * @param {boolean} [options.tailwind] - Enable Tailwind CSS class rules.
 *
 * @returns {object} ESLint rules object.
 */
export const commonRules = (options = {}) => {
  const { typescript = true, importOrder = true, prettier = true, jsdoc = true, tailwind = false } = options;

  return {
    // ---- TypeScript Rules ----
    ...tsRules(typescript),

    // ---- Import Order Rules ----
    ...importOrderRules(importOrder),

    // ---- Prettier Integration ----
    ...prettierRules(prettier),

    // ---- JSDoc Integration ----
    ...jsdocRules(jsdoc),

    // ---- Tailwind Integration ----
    ...tailwindRules(tailwind),
  };
};
