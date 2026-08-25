/**
 * TypeScript configuration constants consumed by the tsconfig preset.
 */

/**
 * @type {{ EXTENDS: string, COMPILER_OPTIONS: object }}
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
