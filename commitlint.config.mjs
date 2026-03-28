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
export { default } from './src/commitlint/index.js';
