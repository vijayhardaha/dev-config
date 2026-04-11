/**
 * =====================================================================.
 * Eslint Common Configuration
 * =====================================================================.
 * Purpose: Shared setup for all ESLint configurations including common
 *          ignores, parser setup, and rule definitions.
 * Docs:    https://eslint.org/docs/latest/use/configure/configuration-files-new
 * =====================================================================.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';

/**
 * Global ignore patterns for ESLint to skip build artifacts, dependencies,
 * and generated files during linting.
 */
export const ignores = [
  '**/.git/',
  '**/.idea/',
  '**/.vscode/',
  '**/.husky/',
  '**/node_modules/',
  '**/.next/',
  '**/dist/',
  '**/build/',
  '**/out/',
  '**/.vercel/',
  '**/.cache/',
  '**/.turbo/',
  '**/*.tsbuildinfo',
  '**/coverage/',
  '**/test-results/',
  '**/.playwright-report/',
  '**/public/',
  '**/.env*',
  '**/next-env.d.ts',
  '**/*.log',
  '**/.DS_Store',
  '**/Thumbs.db',
  '**/*.tmp',
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a FlatCompat instance for using flat config format with older
 * ESLint configurations.
 */
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: js.configs.recommended });

/**
 * Returns the setup object containing shared utilities for ESLint configs.
 *
 * @returns {{ compat: FlatCompat, tsParser: typeof tsParser, __dirname: string }} Reusable setup utilities for ESLint configurations.
 */
export const setup = () => ({ compat, tsParser, __dirname });

/**
 * Global ignores configuration using ESLint's globalIgnores helper.
 *
 * @type {import('eslint').Linter.Config}
 */
export const commonIgnores = [globalIgnores(ignores)];

/**
 * Common parser configuration for TypeScript files.
 *
 * @type {{ parser: typeof tsParser }}
 */
export const commonParser = { parser: tsParser };

/**
 * Common language options for ESLint including ECMAScript version,
 * source type, and global variables.
 *
 * @type {import('eslint').Linter.LanguageOptions}
 */
export const commonLanguageOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: { ...globals.browser, ...globals.node },
};

/**
 * Creates JSDoc rules for enforcing documentation on public/exported APIs.
 *
 * @param {boolean} [jsdoc] - Enable JSDoc rules.
 *
 * @returns {object} JSDoc ESLint rules object.
 */
export const jsdocRules = (jsdoc = true) =>
  jsdoc
    ? {
        // ---- JSDoc Rules for PUBLIC / EXPORTED APIs ----
        'jsdoc/require-jsdoc': [
          'error',
          {
            publicOnly: true,
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
              ArrowFunctionExpression: true,
            },
          },
        ],

        // Descriptions must exist and be meaningful
        'jsdoc/require-description': 'error',
        'jsdoc/require-description-complete-sentence': ['error', { tags: ['param', 'returns'] }],

        // Params must be fully documented
        'jsdoc/require-param': 'error',
        'jsdoc/require-param-name': 'error',
        'jsdoc/require-param-description': 'error',
        'jsdoc/require-param-type': 'error',

        // Returns must be documented
        'jsdoc/require-returns': 'error',
        'jsdoc/require-returns-description': 'error',
        'jsdoc/require-returns-type': 'error',

        // Throws must be documented
        'jsdoc/require-throws': 'error',

        // Strict correctness
        'jsdoc/check-tag-names': 'error',
        'jsdoc/no-undefined-types': ['error', { definedTypes: ['JSX.Element'] }],
        'jsdoc/valid-types': 'error',

        // Enforce clean structure
        'jsdoc/tag-lines': ['error', 'any', { startLines: 1, endLines: 0, applyToEndTag: true }],

        'jsdoc/check-alignment': 'error',
        'jsdoc/check-indentation': 'off',

        // Optional but powerful for large teams
        'jsdoc/sort-tags': [
          'warn',
          { tagSequence: [{ tags: ['description'] }, { tags: ['param'] }, { tags: ['returns'] }] },
        ],

        // Avoid useless docs
        'jsdoc/no-types': 'off',
        'jsdoc/informative-docs': 'warn',

        // Enforce property docs in typedef-style (optional)
        'jsdoc/require-property-description': 'warn',
      }
    : {};

/**
 * Creates TypeScript-specific rules.
 *
 * @param {boolean} [typescript] - Enable TypeScript rules.
 *
 * @returns {object} TypeScript ESLint rules object.
 */
export const tsRules = (typescript = true) =>
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
export const prettierRules = (prettier = true) => (prettier ? { 'prettier/prettier': 'warn' } : {});

/**
 * Creates import order rules.
 *
 * @param {boolean} [importOrder] - Enable import order rules.
 *
 * @returns {object} Import order ESLint rules object.
 */
export const importOrderRules = (importOrder = true) =>
  importOrder
    ? {
        'import/order': [
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
 *
 * @returns {object} ESLint rules object.
 */
export const commonRules = (options = {}) => {
  const { typescript = true, importOrder = true, prettier = true, jsdoc = true } = options;

  return {
    // ---- TypeScript Rules ----
    ...tsRules(typescript),

    // ---- Import Order Rules ----
    ...importOrderRules(importOrder),

    // ---- Prettier Integration ----
    ...prettierRules(prettier),

    // ---- JSDoc Integration ----
    ...jsdocRules(jsdoc),
  };
};

/**
 * File patterns for ESLint configuration.
 *
 * @type {{ withTs: string[], withoutTs: string[] }}
 */
export const files = { withTs: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'], withoutTs: ['**/*.{js,jsx,mjs,cjs}'] };
