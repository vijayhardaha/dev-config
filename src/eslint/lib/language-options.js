import globals from 'globals';

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
