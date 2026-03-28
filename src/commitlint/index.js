/**
 * =====================================================================
 * Commitlint Configuration
 * =====================================================================
 * Purpose: Enforce conventional commit message standards for consistent
 *          and meaningful Git commit history.
 * Docs: https://commitlint.js.org/#/
 * =====================================================================
 */

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  // ---- Extends ----
  // Use conventional commit rules as the base configuration
  extends: ['@commitlint/config-conventional'],

  // ---- Rules ----
  // Maximum length for the commit header (first line)
  rules: {
    'header-max-length': [2, 'always', 50],

    // Maximum length for any line in the commit body
    'body-max-line-length': [2, 'always', 72],

    // Commit body must be in sentence case or lower case
    'body-case': [2, 'always', ['sentence-case', 'lower-case']],

    // Subject case is not enforced (allows flexibility)
    'subject-case': [0],
  },
};

export default config;
