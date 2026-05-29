import { defineConfig } from 'eslint/config';
import importX from 'eslint-plugin-import-x';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

import { globalIgnores } from './ignores.js';
import { commonLanguageOptions } from './language-options.js';
import { commonRules } from './rules.js';
import { commonParser } from './setup.js';

/**
 * Builds a common ESLint configuration with support for various options.
 *
 * @param {object} config - Configuration options.
 * @param {string[]} config.files - File patterns to apply the config to.
 * @param {(Array|object)[]} config.builtinPlugins - Flat config arrays or objects to always include.
 * @param {object} config.conditionalPlugins - Conditional plugins based on options (e.g., { react: true, a11y: true }).
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
  const conditionalPluginList = Object.entries(conditionalPlugins)
    .filter(([key]) => options[key])
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]));

  const builtPlugins = [
    ...builtinPlugins,
    importOrder && importX.flatConfigs.recommended,
    jsdoc && jsdocPlugin.configs['flat/recommended'],
    prettier && prettierRecommended,
    ...conditionalPluginList,
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
    settings: {
      ...(importOrder && { 'import-x/resolver': { typescript: {} } }),
      ...(jsdoc && { jsdoc: { mode: 'typescript' } }),
      ...extraSettings,
      ...settings,
    },
    rules: { ...commonRules({ prettier, importOrder, typescript, jsdoc }), ...extraRules, ...rules },
    ...extend,
  };

  // Merge user global ignores with common global ignores
  const mergedGlobalIgnores = Array.isArray(userGlobalIgnores) ? globalIgnores(userGlobalIgnores) : globalIgnores();

  // Collect all flat configs (arrays spread, objects added directly)
  const flatConfigs = [];

  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      flatConfigs.push(...plugin);
    } else if (typeof plugin === 'object' && plugin !== null) {
      flatConfigs.push(plugin);
    }
  }

  return defineConfig([...mergedGlobalIgnores, ...flatConfigs, configObject]);
};
