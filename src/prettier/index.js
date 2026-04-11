/**
 * =====================================================================.
 * Prettier Configuration
 * =====================================================================.
 * Purpose: Code formatting configuration for consistent style across
 *          the project.
 * Docs:    https://prettier.io/docs/en/configuration.html
 * Usage:   npx prettier --write .
 * =====================================================================.
 */

/** @type {import("prettier").Config} */
const config = {
  // ---- Basic Settings ----
  // Maximum line width before wrapping
  printWidth: 120,
  // Number of spaces per indentation
  tabWidth: 2,
  // Use spaces instead of tabs
  useTabs: false,
  // Add semicolons at the end of statements
  semi: true,
  // Use single quotes for strings
  singleQuote: false,
  // Handle line endings automatically
  endOfLine: 'auto',
  // Always include parentheses around arrow function parameters
  arrowParens: 'always',
  // Trailing commas in multi-line structures
  trailingComma: 'es5',
  // Add spaces between object braces
  bracketSpacing: true,
  // Do not put single-line objects on a single line
  bracketSameLine: false,
  // Preserve prose wrapping in Markdown files
  proseWrap: 'preserve',
  // Experimental operator position at start
  experimentalOperatorPosition: 'start',
  // Collapse object literals
  objectWrap: 'collapse',

  // ---- Overrides ----
  // Different formatting rules for different file types
  overrides: [
    // ---- Backend Languages ----
    // Use 4-space indentation for Python and PHP
    { files: ['*.py', '*.php'], options: { tabWidth: 4, useTabs: false } },

    // ---- JavaScript/TypeScript ----
    // Use 2-space indentation and single quotes for JS/TS
    { files: ['*.js', '*.ts', '*.mjs', '*.cjs', '*.jsx', '*.tsx'], options: { tabWidth: 2, singleQuote: true } },

    // ---- Stylesheet Languages ----
    // Use 2-space indentation for CSS/SCSS/SASS
    { files: ['*.css', '*.scss', '*.sass'], options: { tabWidth: 2 } },

    // ---- Data & Documentation ----
    // Use 2-space indentation and no trailing commas for JSON/YAML/Markdown
    {
      files: ['*.json', '*.jsonc', '*.yml', '*.yaml', '*.md', '*.mdx'],
      options: { tabWidth: 2, trailingComma: 'none' },
    },
    // ---- YAML ----
    // Use yaml parser with 2-space indentation
    { files: ['*.yml', '*.yaml'], options: { parser: 'yaml', tabWidth: 2 } },
  ],
};

export default config;
