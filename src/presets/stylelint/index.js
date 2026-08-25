/**
 * =====================================================================
 * Stylelint Configuration
 * =====================================================================
 * Purpose: CSS/SCSS linting configuration for consistent styling and
 *          proper property ordering.
 * Docs:    https://stylelint.io/user-guide/configure
 * Usage:   npx stylelint .
 * =====================================================================
 */

import { STYLELINT } from '../../lib/constants/stylelint.js';

/** @type {import("stylelint").Config} */
const config = {
  // ---- Extends ----
  // Use standard SCSS configuration and property sort order
  ...STYLELINT.DEFAULTS,

  // ---- Plugins ----
  // Use stylelint-order for property sorting
  plugins: [STYLELINT.PLUGINS.ORDER],

  // ---- Rules ----
  // Disable specific rules that are too strict or conflict with team style
  rules: {
    'selector-class-pattern': null,
    'selector-id-pattern': null,
    'no-empty-source': null,
    'function-url-quotes': null,
    'no-descending-specificity': null,
    'comment-no-empty': null,
    'scss/comment-no-empty': null,
  },
};

export default config;
