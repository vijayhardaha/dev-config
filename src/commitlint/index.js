/**
 * =====================================================================
 * Commitlint Configuration
 * =====================================================================
 * Purpose: Enforce conventional commit message standards for consistent
 *          and meaningful Git commit history.
 * Docs:    https://commitlint.js.org/#/
 * =====================================================================
 */

/** @type {import('@commitlint/types').UserConfig} */
const config = {
  // ---- Extends ----
  // Use conventional commit rules as the base configuration
  extends: ['@commitlint/config-conventional'],

  // ---- Rules ----
  rules: {
    // Enforce a maximum header length of 72 characters
    'header-max-length': [2, 'always', 72],
    // Enforce lowercase for the scope of the commit message
    'scope-case': [2, 'always', 'lower-case'],
  },
};

export default config;
