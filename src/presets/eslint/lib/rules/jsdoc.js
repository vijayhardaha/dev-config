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
export const jsdocRules = (jsdoc = true) =>
  jsdoc ? { ...JSDOC_REQUIRE_RULES, ...JSDOC_CORRECTNESS_RULES, ...JSDOC_STYLE_RULES } : {};
