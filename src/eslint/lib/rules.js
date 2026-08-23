// ---- JSDoc Rules: enforce documentation on public/exported APIs ----

import { existsSync } from 'node:fs';
import path from 'node:path';

import { PRETTIER } from '../../config-constants.js';

// ---- Optional Tailwind Plugins ----------------------------------------------------------
// Both plugins are optional peers. They are loaded lazily so projects without
// Tailwind tooling can still use this package. When a plugin is missing, its
// rules are omitted instead of failing config resolution.

let betterTailwindcssPlugin = null;
try {
  betterTailwindcssPlugin = (await import('eslint-plugin-better-tailwindcss')).default;
} catch {
  betterTailwindcssPlugin = null;
  // Debug logging for optional dependency failure
  if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
    console.debug(
      '[ESLint Config] Optional dependency "eslint-plugin-better-tailwindcss" not found. '
        + 'Tailwind class wrapping, ordering, and canonicalization rules will be disabled. '
        + 'Install it with: npm install --save-dev eslint-plugin-better-tailwindcss'
    );
  }
}

let tailwindCssEslintPlugin = null;
try {
  tailwindCssEslintPlugin = (await import('eslint-plugin-tailwindcss')).default;
} catch {
  tailwindCssEslintPlugin = null;
  // Debug logging for optional dependency failure
  if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
    console.debug(
      '[ESLint Config] Optional dependency "eslint-plugin-tailwindcss" not found. '
        + 'Arbitrary value scale replacement will be disabled. '
        + 'Install it with: npm install --save-dev eslint-plugin-tailwindcss'
    );
  }
}

/**
 * Candidate paths probed (relative to the consumer project root) for the main
 * Tailwind CSS v4 entry stylesheet used for theme resolution.
 *
 * @type {string[]}
 */
const TAILWIND_ENTRY_POINT_CANDIDATES = [
  'src/app/globals.css',
  'app/globals.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'src/input.css',
  'input.css',
];

/**
 * Returns centrally-registered Tailwind plugins that are installed in the
 * consuming project. Missing plugins are omitted so ESLint does not fail on
 * unresolved plugin definitions.
 *
 * @returns {object} Map of plugin names to plugin objects (may be empty).
 */
export const getTailwindCentralPlugins = () => ({
  ...(betterTailwindcssPlugin && { 'better-tailwindcss': betterTailwindcssPlugin }),
  ...(tailwindCssEslintPlugin && { tailwindcss: tailwindCssEslintPlugin }),
});

/**
 * Resolves the Tailwind CSS entry stylesheet used for theme resolution by
 * probing known locations relative to the project root.
 *
 * @returns {string|null} Relative entry point path, or null when none exists.
 */
export const resolveTailwindEntryPoint = () =>
  TAILWIND_ENTRY_POINT_CANDIDATES.find((candidate) => existsSync(path.resolve(process.cwd(), candidate))) ?? null;

/**
 * Creates shared settings consumed by the Tailwind ESLint plugins. Returns an
 * empty object when no entry stylesheet is found so plugins fall back to their
 * own discovery. Users can override any value through `options.settings`.
 *
 * @returns {object} Tailwind-related ESLint shared settings.
 */
export const tailwindSettings = () => {
  const entryPoint = resolveTailwindEntryPoint();

  if (!entryPoint) {
    return {};
  }

  return { tailwindcss: { cssConfigPath: entryPoint }, 'better-tailwindcss': { entryPoint } };
};

/**
 * Creates Tailwind class rules covering canonical class names, whitespace,
 * ordering, line wrapping, and arbitrary value scale replacement. Rules rely
 * on plugins registered separately via `getTailwindCentralPlugins`.
 *
 * @returns {object} Tailwind-related ESLint rules (may be partial when plugins are missing).
 */
export const tailwindRules = () => {
  if (!betterTailwindcssPlugin) {
    return {};
  }

  return {
    // Convert classes to their canonical form (e.g. `aspect-[3/4]` to `aspect-3/4`).
    'better-tailwindcss/enforce-canonical-classes': 'warn',

    // Collapse redundant whitespace inside class strings.
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',

    // Enforce consistent class ordering inside class strings.
    'better-tailwindcss/enforce-consistent-class-order': 'warn',

    // Wrap long class strings into readable multi-line groups.
    'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: PRETTIER.BASE.printWidth }],

    // Replace arbitrary values with matching theme scale utilities (e.g. `p-[16px]` to `p-4`).
    ...(tailwindCssEslintPlugin && { 'tailwindcss/no-unnecessary-arbitrary-value': 'warn' }),
  };
};

/**
 * JSDoc rules that enforce documentation presence on public/exported APIs.
 * Covers `@param`, `@returns`, `@throws`, `@description`, and `@property-description`.
 *
 * @type {object}
 */
const JSDOC_REQUIRE_RULES = {
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
  'jsdoc/require-description': 'error',
  'jsdoc/require-param': 'error',
  'jsdoc/require-param-name': 'error',
  'jsdoc/require-param-description': 'error',
  'jsdoc/require-param-type': 'error',
  'jsdoc/require-returns': 'error',
  'jsdoc/require-returns-description': 'error',
  'jsdoc/require-returns-type': 'error',
  'jsdoc/require-throws': 'error',
  'jsdoc/require-property-description': 'warn',
};

/**
 * JSDoc rules that validate tag names, types, and undefined type references.
 *
 * @type {object}
 */
const JSDOC_CORRECTNESS_RULES = {
  'jsdoc/check-tag-names': 'error',
  'jsdoc/no-undefined-types': ['error', { definedTypes: ['JSX.Element'] }],
  'jsdoc/valid-types': 'error',
};

/**
 * JSDoc rules that enforce consistent formatting and tag ordering.
 *
 * @type {object}
 */
const JSDOC_STYLE_RULES = {
  'jsdoc/tag-lines': ['error', 'any', { startLines: 1, endLines: 0, applyToEndTag: true }],
  'jsdoc/check-alignment': 'error',
  'jsdoc/check-indentation': 'off',
  'jsdoc/sort-tags': [
    'warn',
    {
      tagSequence: [
        { tags: ['description'] },
        { tags: ['template'] },
        { tags: ['param'] },
        { tags: ['returns'] },
        { tags: ['example'] },
      ],
    },
  ],
  'jsdoc/no-types': 'off',
  'jsdoc/informative-docs': 'off',
};

/**
 * Creates JSDoc rules for enforcing documentation on public/exported APIs.
 *
 * @param {boolean} [jsdoc] - Enable JSDoc rules.
 *
 * @returns {object} JSDoc ESLint rules object.
 */
const jsdocRules = (jsdoc = true) =>
  jsdoc ? { ...JSDOC_REQUIRE_RULES, ...JSDOC_CORRECTNESS_RULES, ...JSDOC_STYLE_RULES } : {};

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
  const { typescript = true, importOrder = true, prettier = true, jsdoc = true, tailwind = true } = options;

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
    ...(tailwind && tailwindRules()),
  };
};
