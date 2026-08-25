/**
 * =====================================================================
 * Tailwind ESLint Recipe
 * =====================================================================
 * Opt-in ESLint config fragment consumers spread into their own config
 * to enable Tailwind class rules. Replaces the Tailwind code path that
 * previously lived inside the core `createConfig` builder.
 *
 * The recipe is fully lazy: it imports the two Tailwind plugins and
 * Prettier only when called, so projects that do not use Tailwind pay
 * no cost.
 * Docs:    https://github.com/vijayhardaha/dev-config
 * Usage:
 *   import { createConfig } from '@vijayhardaha/dev-config/eslint/next';
 *   import { tailwind } from '@vijayhardaha/dev-config/eslint/recipes/tailwind';
 *   export default [...createConfig(), tailwind({ entryPoint: 'src/app/globals.css' })];
 * =====================================================================
 */

import { existsSync } from 'node:fs';
import path from 'node:path';

import { loadTailwindPlugins } from './tailwind-plugins.js';
import { PRETTIER } from '../../config-constants.js';

/**
 * Candidate paths probed (relative to the recipe's `cwd`) for the main
 * Tailwind CSS v4 entry stylesheet used for theme resolution.
 *
 * @type {string[]}
 */
const ENTRY_POINT_CANDIDATES = [
  'src/app/globals.css',
  'app/globals.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'src/input.css',
  'input.css',
];

/**
 * Resolves the Tailwind CSS entry stylesheet by probing known locations
 * relative to the provided cwd. Returns the first match or `null` when no
 * candidate exists.
 *
 * @param {string} cwd - Absolute path of the consumer project root.
 *
 * @returns {string|null} Relative entry-point path, or null when none exists.
 */
const resolveEntryPoint = (cwd) =>
  ENTRY_POINT_CANDIDATES.find((candidate) => existsSync(path.resolve(cwd, candidate))) ?? null;

/**
 * Detects whether the consumer Prettier config enables the Tailwind Prettier
 * plugin. When present, class ordering and line wrapping belong to the
 * formatter, and enforcing them here too would cause circular fixes.
 *
 * Detection is best-effort: a failure to resolve the config means the
 * lint-side rules stay enabled.
 *
 * @param {string} prettierConfigPath - Path Prettier uses as a config anchor.
 *
 * @returns {Promise<boolean>} True when the Tailwind Prettier plugin is active.
 */
const detectPrettierTailwindPlugin = async (prettierConfigPath) => {
  try {
    const prettier = await import('prettier');
    const resolved = await prettier.resolveConfig(prettierConfigPath);
    const detected = Array.isArray(resolved?.plugins) && resolved.plugins.includes('prettier-plugin-tailwindcss');

    if (detected && (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*')) {
      console.debug(
        '[ESLint Config] Detected "prettier-plugin-tailwindcss" in the consumer Prettier config. '
          + 'Class ordering and line wrapping rules are left to Prettier.'
      );
    }

    return detected;
  } catch {
    return false;
  }
};

/**
 * Builds the Tailwind ESLint config fragment. Returns a single
 * `Linter.Config` object that consumers spread into their config array.
 *
 * The returned object is empty (`{ plugins: {}, settings: {}, rules: {} }`)
 * when neither Tailwind plugin is installed in the consumer project.
 *
 * @param {object} [options] - Recipe options.
 * @param {string} [options.entryPoint] - Explicit Tailwind entry stylesheet path (relative to `cwd`).
 * @param {string} [options.prettierConfigPath] - Path Prettier uses as a config anchor (defaults to `<cwd>/package.json`).
 * @param {string} [options.cwd] - Consumer project root (defaults to `process.cwd()`).
 *
 * @returns {Promise<import('eslint').Linter.Config>} Tailwind config fragment.
 */
export const tailwind = async ({ entryPoint, prettierConfigPath, cwd = process.cwd() } = {}) => {
  const { better, core } = await loadTailwindPlugins();

  if (!better && !core) {
    return { plugins: {}, settings: {}, rules: {} };
  }

  const resolvedEntry = entryPoint ?? resolveEntryPoint(cwd);
  const prettierAnchor = prettierConfigPath ?? path.join(cwd, 'package.json');
  const formatterOwnsOrdering = await detectPrettierTailwindPlugin(prettierAnchor);

  const plugins = { ...(better && { 'better-tailwindcss': better }), ...(core && { tailwindcss: core }) };

  const settings = resolvedEntry
    ? { tailwindcss: { cssConfigPath: resolvedEntry }, 'better-tailwindcss': { entryPoint: resolvedEntry } }
    : {};

  const rules = {
    'better-tailwindcss/enforce-canonical-classes': 'warn',
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',
    ...(formatterOwnsOrdering
      ? {}
      : {
          'better-tailwindcss/enforce-consistent-class-order': 'warn',
          'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: PRETTIER.BASE.printWidth }],
        }),
    ...(core && { 'tailwindcss/no-unnecessary-arbitrary-value': 'warn' }),
  };

  return { plugins, settings, rules };
};
