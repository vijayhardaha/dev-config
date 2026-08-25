/**
 * JSConfig configuration constants consumed by the jsconfig preset.
 */

/**
 * @type {{ EXTENDS: string, COMPILER_OPTIONS: object }}
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
