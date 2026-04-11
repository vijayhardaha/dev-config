/**
 * =====================================================================.
 * Eslint Configuration (Flat)
 * =====================================================================.
 * Purpose: Project-wide ESLint configuration for Next.js, TypeScript, and
 *          React. Enforces code quality, accessibility, and consistent styling.
 * Docs:    https://eslint.org/docs/latest/use/configure/configuration-files-new
 * Usage:   npx eslint .
 * =====================================================================.
 */

import { createConfig } from './src/eslint/index.js';

/** @type {import('eslint').Linter.Config[]} */
export default createConfig({
  // ---- Import Order ----
  // Disable automatic import sorting to avoid conflicts with other
  // formatters
  importOrder: false,
});
