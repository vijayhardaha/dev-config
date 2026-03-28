/**
 * =====================================================================
 * Eslint Common Configuration
 * =====================================================================
 * Purpose: Shared setup for all ESLint configurations including common
 *          ignores, parser setup, and rule definitions.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * =====================================================================
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
 * @returns {{ compat: FlatCompat, tsParser: typeof tsParser, __dirname: string }}
 */
export const setup = () => ({ compat, tsParser, __dirname });

/**
 * Global ignores configuration using ESLint's globalIgnores helper.
 * @type {import('eslint').Linter.Config}
 */
export const commonIgnores = [globalIgnores(ignores)];

/**
 * Common parser configuration for TypeScript files.
 * @type {{ parser: typeof tsParser }}
 */
export const commonParser = { parser: tsParser };

/**
 * Common language options for ESLint including ECMAScript version,
 * source type, and global variables.
 * @type {import('eslint').Linter.LanguageOptions}
 */
export const commonLanguageOptions = {
  ecmaVersion: 'latest',
  sourceType: 'module',
  globals: { ...globals.browser, ...globals.node },
};

/**
 * Creates a rules object based on the provided options.
 * @param {Object} [options] - Configuration options
 * @param {boolean} [options.typescript=true] - Enable TypeScript-specific rules
 * @param {boolean} [options.importOrder=true] - Enable import order rules
 * @param {boolean} [options.prettier=true] - Enable Prettier integration
 * @returns {Object} ESLint rules object
 */
export const commonRules = (options = {}) => {
  const { typescript = true, importOrder = true, prettier = true } = options;

  return {
    // ---- TypeScript Rules ----
    // Report unused variables with TypeScript-aware analysis
    ...(typescript && {
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
    }),

    // ---- Import Order Rules ----
    // Enforce consistent import ordering with specific group priorities
    ...(importOrder && {
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
    }),

    // ---- Prettier Integration ----
    // Report Prettier formatting issues as warnings
    ...(prettier && { 'prettier/prettier': 'warn' }),
  };
};

/**
 * File patterns for ESLint configuration.
 * @type {{ withTs: string[], withoutTs: string[] }}
 */
export const files = { withTs: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'], withoutTs: ['**/*.{js,jsx,mjs,cjs}'] };
