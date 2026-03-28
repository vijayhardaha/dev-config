/**
 * =====================================================================
 * eslint.config.mjs
 * =====================================================================
 * Purpose: ESLint configuration for linting JavaScript/TypeScript
 *          files.
 * Docs: https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage: npx eslint .
 * =====================================================================
 */

import { createConfig } from './src/eslint/index.js';

/** @type {import('eslint').Linter.Config[]} */
export default createConfig({
  // ---- Import Order ----
  // Disable automatic import sorting to avoid conflicts with other
  // formatters
  importOrder: false,
});
