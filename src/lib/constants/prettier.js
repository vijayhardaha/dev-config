/**
 * Prettier configuration constants shared across the Prettier preset and
 * any consumer that needs raw Prettier settings (e.g. Tailwind line-wrap).
 */

/**
 * @type {{
 *   BASE: object,
 *   INDENTATION: { BACKEND: number, FRONTEND: number },
 *   PLUGINS: { XML: string },
 *   FILE_PATTERNS: { BACKEND: string[], JAVASCRIPT: string[], STYLESHEETS: string[], DATA_AND_DOCS: string[], YAML: string[], XML: string[] },
 *   OVERRIDES: { BACKEND: object, JAVASCRIPT: object, STYLESHEETS: object, DATA_AND_DOCS: object, YAML: object, XML: object }
 * }}
 */
export const PRETTIER = {
  // Base formatting settings
  BASE: {
    printWidth: 120,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    endOfLine: 'auto',
    arrowParens: 'always',
    trailingComma: 'es5',
    bracketSpacing: true,
    bracketSameLine: false,
    proseWrap: 'preserve',
    experimentalOperatorPosition: 'start',
    objectWrap: 'collapse',
    xmlWhitespaceSensitivity: 'preserve',
  },

  // Indentation settings
  INDENTATION: {
    BACKEND: 4, // Python, PHP
    FRONTEND: 2, // JavaScript, CSS, etc.
  },

  // Prettier plugins
  PLUGINS: { XML: '@prettier/plugin-xml' },

  // File type patterns for overrides
  FILE_PATTERNS: {
    BACKEND: ['*.py', '*.php'],
    JAVASCRIPT: ['*.js', '*.ts', '*.mjs', '*.cjs', '*.jsx', '*.tsx'],
    STYLESHEETS: ['*.css', '*.scss', '*.sass'],
    DATA_AND_DOCS: ['*.json', '*.jsonc', '*.yml', '*.yaml', '*.md', '*.mdx'],
    YAML: ['*.yml', '*.yaml'],
    XML: ['**/*.xml', '**/*.xsd', '**/*.xsl', '**/*.xslt'],
  },

  // Override options by file type
  OVERRIDES: {
    BACKEND: { tabWidth: 4, useTabs: false },
    JAVASCRIPT: { tabWidth: 2, singleQuote: true },
    STYLESHEETS: { tabWidth: 2 },
    DATA_AND_DOCS: { tabWidth: 2, trailingComma: 'none' },
    YAML: { parser: 'yaml', tabWidth: 2 },
    XML: { tabWidth: 2, xmlWhitespaceSensitivity: 'preserve' },
  },
};
