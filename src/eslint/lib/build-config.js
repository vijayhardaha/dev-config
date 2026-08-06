import { existsSync } from 'node:fs';
import path from 'node:path';

import { fixupPluginRules } from '@eslint/compat';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import { createNodeResolver, flatConfigs as importXFlatConfigs } from 'eslint-plugin-import-x';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

import { globalIgnores } from './ignores.js';
import { commonLanguageOptions } from './language-options.js';
import { getEnabledPlugins, flattenPlugins, fixupPlugins, stripPlugins, stripParser } from './plugin-helpers/index.js';
import { commonRules } from './rules.js';
import { commonParser } from './setup.js';

let createTypeScriptImportResolver;
try {
  createTypeScriptImportResolver = (await import('eslint-import-resolver-typescript')).createTypeScriptImportResolver;
} catch {
  createTypeScriptImportResolver = null;
  // Debug logging for optional dependency failure
  if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
    console.debug(
      '[ESLint Config] Optional dependency "eslint-import-resolver-typescript" not found. '
        + 'TypeScript import resolution will be disabled. '
        + 'Install it with: npm install --save-dev eslint-import-resolver-typescript'
    );
  }
}

/**
 * Merges user-provided global ignores with common defaults.
 *
 * @param {string[]|undefined} userGlobalIgnores - User-provided ignore patterns.
 *
 * @returns {import('eslint').Linter.Config[]} ESLint global ignores configuration.
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
  const { ignores, rules, settings, extend } = opts;

  return {
    files: [...filePatterns],
    ...(ignores && { ignores }),
    plugins: Object.fromEntries(
      Object.entries(centralPlugins).map(([name, plugin]) => [name, fixupPluginRules(plugin)])
    ),
    languageOptions: {
      ...commonLanguageOptions,
      ...(typescript && commonParser),
      ...extraLanguageOptions,
      ...(typescript && { parserOptions: { tsconfigRootDir: process.cwd(), ...parserOptions } }),
    },
    settings: {
      ...(opts.importOrder && {
        'import-x/resolver-next': [
          createNodeResolver(),
          ...(createTypeScriptImportResolver ? [createTypeScriptImportResolver()] : []),
        ],
      }),
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
    opts.importOrder && importXFlatConfigs.recommended,
    opts.jsdoc && jsdocPlugin.configs['flat/recommended'],
    opts.prettier && prettierRecommended,
    ...conditionalPluginList,
    ...(opts.plugins || []),
  ].filter(Boolean);

  const flatConfigs = flattenPlugins(mergedPlugins);
  const wrappedConfigs = fixupPlugins(flatConfigs);
  const strippedConfigs = stripPlugins(wrappedConfigs, Object.keys(centralPlugins));
  const parsedConfigs = typescript ? stripParser(strippedConfigs) : strippedConfigs;
  const mergedGlobalIgnores = mergeGlobalIgnores(opts.globalIgnores);

  const gitignorePath = path.resolve(process.cwd(), '.gitignore');
  const gitignoreConfig = existsSync(gitignorePath) ? includeIgnoreFile(gitignorePath) : null;

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

  return defineConfig([
    ...mergedGlobalIgnores,
    ...(gitignoreConfig ? [gitignoreConfig] : []),
    ...parsedConfigs,
    configObject,
  ]);
};
