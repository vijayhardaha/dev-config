/**
 * ESLint configuration constants shared across the ESLint presets and the
 * file-pattern helpers.
 */

/**
 * @type {{
 *   FILES: { JAVASCRIPT: string[], TYPESCRIPT: string[], JSX: string[], ALL_JS: string[], ALL_JS_NO_TS: string[] },
 *   FILE_PATTERNS: { withTs: string[], withoutTs: string[] }
 * }}
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
