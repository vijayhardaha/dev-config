import { fixupPluginRules } from '@eslint/compat';
import { defineConfig } from 'eslint/config';
import importX from 'eslint-plugin-import-x';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

import { globalIgnores } from './ignores.js';
import { commonLanguageOptions } from './language-options.js';
import { commonRules } from './rules.js';

/**
 * Filters conditional plugins based on user options.
 *
 * @param {object} conditionalPlugins - Plugin map keyed by option name.
 * @param {object} options - User-provided options.
 *
 * @returns {object[]} Flat config objects for enabled plugins.
 */
const getEnabledPlugins = (conditionalPlugins, options) =>
  Object.entries(conditionalPlugins)
    .filter(([key]) => options[key])
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]));

/**
 * Flattens a mixed list of config arrays and objects.
 *
 * @param {(Array|object)[]} plugins - Mixed list of flat config arrays and objects.
 *
 * @returns {object[]} Flattened config array.
 */
const flattenPlugins = (plugins) => {
  const result = [];

  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      result.push(...plugin);
    } else if (typeof plugin === 'object' && plugin !== null) {
      result.push(plugin);
    }
  }

  return result;
};

/**
 * Wraps plugin rules with fixupPluginRules for backward compatibility.
 *
 * @param {object[]} flatConfigs - Flat config array.
 *
 * @returns {object[]} Config array with wrapped plugin rules.
 */
const fixPlugins = (flatConfigs) =>
  flatConfigs.map((config) => {
    if (!config.plugins) return config;

    const fixed = { ...config, plugins: {} };

    for (const [name, plugin] of Object.entries(config.plugins)) {
      fixed.plugins[name] = fixupPluginRules(plugin);
    }

    return fixed;
  });

/**
 * Removes centrally-registered plugins from individual configs to prevent
 * "Cannot redefine plugin" errors.
 *
 * @param {object[]} flatConfigs - Flat config array.
 * @param {string[]} pluginNames - Plugin names to strip from configs.
 *
 * @returns {object[]} Config array with specified plugins removed.
 */
const stripPlugins = (flatConfigs, pluginNames) => {
  if (pluginNames.length === 0) return flatConfigs;

  const skip = new Set(pluginNames);

  return flatConfigs.map((config) => {
    if (!config.plugins) return config;

    const plugins = { ...config.plugins };

    for (const name of skip) {
      delete plugins[name];
    }

    if (Object.keys(plugins).length === 0) {
      const { plugins: _, ...rest } = config;

      return rest;
    }

    return { ...config, plugins };
  });
};

/**
 * Merges user-provided global ignores with common defaults.
 *
 * @param {string[]|undefined} userGlobalIgnores - User-provided ignore patterns.
 *
 * @returns {object} ESLint ignores config object.
 */
const mergeGlobalIgnores = (userGlobalIgnores) =>
  Array.isArray(userGlobalIgnores) ? globalIgnores(userGlobalIgnores) : globalIgnores();

/**
 * Builds the main ESLint config object with language options, settings, rules,
 * and centrally-registered plugins.
 *
 * @param {object} ctx - Context object with all config parameters.
 * @param {string[]} ctx.filePatterns - File patterns to apply the config to.
 * @param {object} ctx.opts - Resolved user options.
 * @param {boolean} ctx.typescript - Enable TypeScript support.
 * @param {object} ctx.centralPlugins - Plugins to register on the main config.
 * @param {object} ctx.extraLanguageOptions - Additional language options.
 * @param {object} ctx.parserOptions - Parser options.
 * @param {object} ctx.extraSettings - Additional settings.
 * @param {object} ctx.extraRules - Additional rules.
 *
 * @returns {import('eslint').Linter.Config} ESLint config object.
 */
const buildConfigObject = ({
  filePatterns,
  opts,
  typescript,
  centralPlugins = {},
  extraLanguageOptions,
  parserOptions,
  extraSettings,
  extraRules,
}) => {
  const { ignores, rules, settings, languageOptions, extend } = opts;

  return {
    files: [...filePatterns],
    ...(ignores && { ignores }),
    plugins: Object.fromEntries(
      Object.entries(centralPlugins).map(([name, plugin]) => [name, fixupPluginRules(plugin)])
    ),
    languageOptions: {
      ...commonLanguageOptions,
      ...extraLanguageOptions,
      ...(typescript && { parserOptions: { tsconfigRootDir: process.cwd(), ...parserOptions } }),
    },
    settings: {
      ...(opts.importOrder && { 'import-x/resolver': { typescript: {} } }),
      ...(opts.jsdoc && { jsdoc: { mode: 'typescript' } }),
      ...extraSettings,
      ...settings,
    },
    rules: {
      ...commonRules({ prettier: opts.prettier, importOrder: opts.importOrder, typescript, jsdoc: opts.jsdoc }),
      ...extraRules,
      ...rules,
    },
    ...extend,
  };
};

/**
 * Builds a flat ESLint configuration.
 *
 * @param {object} config - Configuration options.
 * @param {string[]} config.files - File patterns to apply the config to.
 * @param {(Array|object)[]} config.builtinPlugins - Flat config arrays or objects to always include.
 * @param {object} config.conditionalPlugins - Conditional plugins based on options.
 * @param {object} config.centralPlugins - Plugins registered on the main config object.
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
  centralPlugins = {},
  languageOptions: extraLanguageOptions = {},
  parserOptions = {},
  settings: extraSettings = {},
  rules: extraRules = {},
  options = {},
  typescript = false,
}) => {
  const opts = { prettier: true, importOrder: true, jsdoc: true, ...options };

  const conditionalPluginList = getEnabledPlugins(conditionalPlugins, opts);

  const mergedPlugins = [
    ...builtinPlugins,
    opts.importOrder && importX.flatConfigs.recommended,
    opts.jsdoc && jsdocPlugin.configs['flat/recommended'],
    opts.prettier && prettierRecommended,
    ...conditionalPluginList,
    ...(opts.plugins || []),
  ].filter(Boolean);

  const flatConfigs = flattenPlugins(mergedPlugins);
  const wrappedConfigs = fixPlugins(flatConfigs);
  const strippedConfigs = stripPlugins(wrappedConfigs, Object.keys(centralPlugins));
  const mergedGlobalIgnores = mergeGlobalIgnores(opts.globalIgnores);

  const configObject = buildConfigObject({
    filePatterns,
    opts,
    typescript,
    centralPlugins,
    extraLanguageOptions,
    parserOptions,
    extraSettings,
    extraRules,
  });

  return defineConfig([...mergedGlobalIgnores, ...strippedConfigs, configObject]);
};
