import { defineConfig } from 'eslint/config';

import { globalIgnores } from './ignores.js';
import { commonLanguageOptions } from './language-options.js';
import { commonRules } from './rules.js';
import { commonParser } from './setup.js';

/**
 * Builds a common ESLint configuration with support for various options.
 *
 * @param {object} config - Configuration options.
 * @param {object} config.compat - FlatCompat instance.
 * @param {string[]} config.files - File patterns to apply the config to.
 * @param {string[]} config.builtinPlugins - Plugin configs to always include (e.g., 'plugin:@typescript-eslint/recommended').
 * @param {object} config.conditionalPlugins - Conditional plugins based on options (e.g., { prettier: true, importOrder: true }).
 * @param {object} [config.languageOptions] - Additional language options.
 * @param {object} [config.parserOptions] - Parser options.
 * @param {object} [config.settings] - Settings object.
 * @param {object} [config.rules] - Additional rules.
 * @param {object} [config.options] - User-provided options.
 * @param {boolean} [config.typescript] - Enable TypeScript support.
 *
 * @returns {import('eslint').Linter.Config[]} ESLint configuration array.
 */
export const buildConfig = ({
  compat,
  files: filePatterns,
  builtinPlugins = [],
  conditionalPlugins = {},
  languageOptions: extraLanguageOptions = {},
  parserOptions = {},
  settings: extraSettings = {},
  rules: extraRules = {},
  options = {},
  typescript = false,
}) => {
  const {
    prettier = true,
    importOrder = true,
    jsdoc = true,
    ignores,
    rules,
    settings,
    languageOptions,
    plugins: userPlugins,
    globalIgnores: userGlobalIgnores,
    extend,
  } = options;

  // ---- Build extends configs ----
  const builtPlugins = [
    ...builtinPlugins,
    importOrder && 'plugin:import/recommended',
    jsdoc && 'plugin:jsdoc/recommended',
    prettier && 'plugin:prettier/recommended',
    ...Object.entries(conditionalPlugins)
      .filter(([key]) => options[key])
      .map(([, value]) => value),
  ].filter(Boolean);

  const plugins = [...builtPlugins, ...(userPlugins || [])];

  // ---- Build config object ----
  const configObject = {
    files: [...filePatterns],
    ...(ignores && { ignores }),
    languageOptions: {
      ...commonLanguageOptions,
      ...(typescript && commonParser),
      ...extraLanguageOptions,
      ...languageOptions,
      ...(typescript && { parserOptions: { tsconfigRootDir: process.cwd(), ...parserOptions } }),
    },
    settings: { ...(importOrder && { 'import/resolver': { typescript: {} } }), ...extraSettings, ...settings },
    rules: { ...commonRules({ prettier, importOrder, typescript, jsdoc }), ...extraRules, ...rules },
    ...extend,
  };

  // Merge user global ignores with common global ignores
  const mergedGlobalIgnores = Array.isArray(userGlobalIgnores) ? globalIgnores(userGlobalIgnores) : globalIgnores();

  return defineConfig([...mergedGlobalIgnores, ...compat.extends(...plugins), configObject]);
};
