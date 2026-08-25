// ---- Optional Tailwind Plugins ----------------------------------------------------------
// Both plugins are optional peers. They are loaded lazily so projects without
// Tailwind tooling can still use this package. When a plugin is missing, its
// rules are omitted instead of failing config resolution.

import { existsSync } from 'node:fs';
import path from 'node:path';

import { PRETTIER } from '../../../../lib/constants/prettier.js';

let betterTailwindcssPlugin = null;
try {
  betterTailwindcssPlugin = (await import('eslint-plugin-better-tailwindcss')).default;
} catch {
  betterTailwindcssPlugin = null;
  // Debug logging for optional dependency failure
  if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
    console.debug(
      '[ESLint Config] Optional dependency "eslint-plugin-better-tailwindcss" not found. '
        + 'Tailwind class wrapping, ordering, and canonicalization rules will be disabled. '
        + 'Install it with: npm install --save-dev eslint-plugin-better-tailwindcss'
    );
  }
}

let tailwindCssEslintPlugin = null;
try {
  tailwindCssEslintPlugin = (await import('eslint-plugin-tailwindcss')).default;
} catch {
  tailwindCssEslintPlugin = null;
  // Debug logging for optional dependency failure
  if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
    console.debug(
      '[ESLint Config] Optional dependency "eslint-plugin-tailwindcss" not found. '
        + 'Arbitrary value scale replacement will be disabled. '
        + 'Install it with: npm install --save-dev eslint-plugin-tailwindcss'
    );
  }
}

/**
 * Indicates whether the consumer Prettier config enables the Tailwind
 * Prettier plugin. When present, class ordering and line wrapping belong to
 * the formatter, and enforcing them here too would cause circular fixes.
 *
 * @type {boolean}
 */
let prettierTailwindPluginDetected = false;
try {
  const prettierModule = await import('prettier');
  const resolvedPrettierConfig = await prettierModule.resolveConfig(path.join(process.cwd(), 'package.json'));
  prettierTailwindPluginDetected = Boolean(
    Array.isArray(resolvedPrettierConfig?.plugins)
    && resolvedPrettierConfig.plugins.includes('prettier-plugin-tailwindcss')
  );
  if (prettierTailwindPluginDetected && (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*')) {
    console.debug(
      '[ESLint Config] Detected "prettier-plugin-tailwindcss" in the consumer Prettier config. '
        + 'Class ordering and line wrapping rules are left to Prettier.'
    );
  }
} catch {
  // Detection is best-effort; without a resolvable config, lint rules stay active.
}

/**
 * Candidate paths probed (relative to the consumer project root) for the main
 * Tailwind CSS v4 entry stylesheet used for theme resolution.
 *
 * @type {string[]}
 */
const TAILWIND_ENTRY_POINT_CANDIDATES = [
  'src/app/globals.css',
  'app/globals.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'src/input.css',
  'input.css',
];

/**
 * Returns centrally-registered Tailwind plugins that are installed in the
 * consuming project. Missing plugins are omitted so ESLint does not fail on
 * unresolved plugin definitions.
 *
 * @returns {object} Map of plugin names to plugin objects (may be empty).
 */
export const getTailwindCentralPlugins = () => ({
  ...(betterTailwindcssPlugin && { 'better-tailwindcss': betterTailwindcssPlugin }),
  ...(tailwindCssEslintPlugin && { tailwindcss: tailwindCssEslintPlugin }),
});

/**
 * Resolves the Tailwind CSS entry stylesheet used for theme resolution by
 * probing known locations relative to the project root.
 *
 * @returns {string|null} Relative entry point path, or null when none exists.
 */
export const resolveTailwindEntryPoint = () =>
  TAILWIND_ENTRY_POINT_CANDIDATES.find((candidate) => existsSync(path.resolve(process.cwd(), candidate))) ?? null;

/**
 * Creates shared settings consumed by the Tailwind ESLint plugins. Returns an
 * empty object when no entry stylesheet is found so plugins fall back to their
 * own discovery. Users can override any value through `options.settings`.
 *
 * @returns {object} Tailwind-related ESLint shared settings.
 */
export const tailwindSettings = () => {
  const entryPoint = resolveTailwindEntryPoint();

  if (!entryPoint) {
    return {};
  }

  return { tailwindcss: { cssConfigPath: entryPoint }, 'better-tailwindcss': { entryPoint } };
};

/**
 * Creates Tailwind class rules covering canonical class names, whitespace,
 * ordering, line wrapping, and arbitrary value scale replacement. Rules rely
 * on plugins registered separately via `getTailwindCentralPlugins`. When the
 * consumer enables `prettier-plugin-tailwindcss`, ordering and wrapping are
 * omitted so the formatter owns those concerns without circular fixes.
 *
 * @param {boolean} [tailwind] - Enable Tailwind CSS class rules.
 *
 * @returns {object} Tailwind-related ESLint rules (may be partial when plugins are missing).
 */
export const tailwindRules = (tailwind = true) => {
  if (!tailwind || !betterTailwindcssPlugin) {
    return {};
  }

  return {
    // Convert classes to their canonical form (e.g. `aspect-[3/4]` to `aspect-3/4`).
    'better-tailwindcss/enforce-canonical-classes': 'warn',

    // Collapse redundant whitespace inside class strings.
    'better-tailwindcss/no-unnecessary-whitespace': 'warn',

    // Enforce consistent class ordering inside class strings. Skipped when
    // prettier-plugin-tailwindcss already sorts classes during formatting.
    ...(prettierTailwindPluginDetected ? {} : { 'better-tailwindcss/enforce-consistent-class-order': 'warn' }),

    // Wrap long class strings into readable multi-line groups. Skipped when
    // prettier-plugin-tailwindcss already wraps classes during formatting.
    ...(prettierTailwindPluginDetected
      ? {}
      : { 'better-tailwindcss/enforce-consistent-line-wrapping': ['warn', { printWidth: PRETTIER.BASE.printWidth }] }),

    // Replace arbitrary values with matching theme scale utilities (e.g. `p-[16px]` to `p-4`).
    ...(tailwindCssEslintPlugin && { 'tailwindcss/no-unnecessary-arbitrary-value': 'warn' }),
  };
};
