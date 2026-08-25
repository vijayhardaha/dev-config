/**
 * =====================================================================
 * Prettier Configuration
 * =====================================================================
 * Purpose: Code formatting configuration for consistent style across
 *          the project.
 * Docs:    https://prettier.io/docs/en/configuration.html
 * Usage:   npx prettier --write .
 * =====================================================================
 */

import { PRETTIER } from '../config-constants.js';

/** @type {import("prettier").Config} */
const config = {
  // ---- Basic Settings ----
  ...PRETTIER.BASE,

  // ---- Plugins ----
  plugins: [PRETTIER.PLUGINS.XML],

  // ---- Overrides ----
  // Different formatting rules for different file types
  overrides: [
    // ---- Backend Languages ----
    { files: PRETTIER.FILE_PATTERNS.BACKEND, options: PRETTIER.OVERRIDES.BACKEND },

    // ---- JavaScript/TypeScript ----
    { files: PRETTIER.FILE_PATTERNS.JAVASCRIPT, options: PRETTIER.OVERRIDES.JAVASCRIPT },

    // ---- Stylesheet Languages ----
    { files: PRETTIER.FILE_PATTERNS.STYLESHEETS, options: PRETTIER.OVERRIDES.STYLESHEETS },

    // ---- Data & Documentation ----
    { files: PRETTIER.FILE_PATTERNS.DATA_AND_DOCS, options: PRETTIER.OVERRIDES.DATA_AND_DOCS },

    // ---- YAML ----
    { files: PRETTIER.FILE_PATTERNS.YAML, options: PRETTIER.OVERRIDES.YAML },

    // ---- XML ----
    { files: PRETTIER.FILE_PATTERNS.XML, options: PRETTIER.OVERRIDES.XML },
  ],
};

export default config;
