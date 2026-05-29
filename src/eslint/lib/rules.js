// ---- JSDoc Rules: enforce documentation on public/exported APIs ----

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
