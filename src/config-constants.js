/**
 * =====================================================================
 * Configuration Constants
 * =====================================================================
 * Purpose: Centralized repository of all hardcoded configuration values
 *          used across the dev-config package.
 * Usage:   Import constants and use in config builders
 * =====================================================================
 */

/**
 * ESLint Configuration Constants
 */
export const ESLINT = {
  // File patterns for different file types
  FILES: {
    JAVASCRIPT: ['**/*.{js,mjs,cjs}'],
    TYPESCRIPT: ['**/*.{ts,mts,cts}'],
    JSX: ['**/*.{jsx,tsx}'],
    ALL_JS: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    ALL_JS_NO_TS: ['**/*.{js,jsx,mjs,cjs}'],
  },

  // File patterns groups
  FILE_PATTERNS: { withTs: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'], withoutTs: ['**/*.{js,jsx,mjs,cjs}'] },
};

/**
 * Prettier Configuration Constants
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

/**
 * Next Sitemap Configuration Constants
 */
export const SITEMAP = {
  // Default values
  DEFAULTS: {
    SITE_URL: 'https://example.com',
    OUTPUT_DIR: './public',
    EXCLUDE_PATHS: ['/404', '/500'],
    CHANGE_FREQUENCY: 'weekly',
    PRIORITY: 0.7,
    SITEMAP_FILENAME: 'sitemap',
    TRAILING_SLASH: false,
    GENERATE_ROBOTS_TXT: true,
  },

  // Robots.txt configuration
  ROBOTS_TXT: { USER_AGENT: '*', ALLOW: '/' },

  // Headers
  HEADERS: { HOST: '# Host' },
};

/**
 * Commitlint Configuration Constants
 */
export const COMMITLINT = {
  // Defaults (extends conventional config)
  DEFAULTS: { extends: ['@commitlint/config-conventional'] },
};

/**
 * Stylelint Configuration Constants
 */
export const STYLELINT = {
  // Defaults
  DEFAULTS: { extends: ['stylelint-config-standard-scss', 'stylelint-config-property-sort-order-smacss'] },

  // Plugins
  PLUGINS: { ORDER: 'stylelint-order' },

  // Configuration
  CONFIG: { customSyntax: 'postcss-scss' },
};

/**
 * TypeScript Configuration Constants
 */
export const TYPESCRIPT = {
  // Extends from
  EXTENDS: './tsconfig.json',

  // Core compiler options
  COMPILER_OPTIONS: {
    target: 'ES2020',
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    jsx: 'react-jsx',
    module: 'ESNext',
    moduleResolution: 'bundler',
    allowJs: true,
    strict: true,
    skipLibCheck: true,
    esModuleInterop: true,
    resolveJsonModule: true,
    incremental: true,
  },
};

/**
 * JSConfig Configuration Constants
 */
export const JSCONFIG = {
  // Extends from
  EXTENDS: './jsconfig.json',

  // Core compiler options
  COMPILER_OPTIONS: {
    target: 'ES2020',
    module: 'ESNext',
    moduleResolution: 'bundler',
    lib: ['ES2020', 'DOM', 'DOM.Iterable'],
    allowJs: true,
    strict: false,
    skipLibCheck: true,
    esModuleInterop: true,
    resolveJsonModule: true,
  },
};

/**
 * Husky Configuration Constants
 */
export const HUSKY = { DEFAULTS: { version: '9' } };
