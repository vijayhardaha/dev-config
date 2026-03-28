/**
 * =====================================================================
 * commitlint.config.mjs
 * =====================================================================
 * Purpose: Commitlint configuration for enforcing conventional commit
 *          messages.
 * Docs: https://commitlint.js.org/#/
 * Usage: npx commitlint --from=HEAD~1
 * =====================================================================
 */

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 50],
    'body-max-line-length': [2, 'always', 72],
    'body-case': [2, 'always', ['sentence-case', 'lower-case']],
    'subject-case': [0],
  },
};

export default config;
