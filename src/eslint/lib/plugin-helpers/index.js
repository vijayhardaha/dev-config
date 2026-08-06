/**
 * ESLint Plugin Helpers
 *
 * Collection of utility functions for manipulating and processing ESLint
 * flat config plugins. Each function handles a specific transformation:
 *
 * - getEnabledPlugins: Filter plugins by user options
 * - flattenPlugins: Flatten nested arrays and objects
 * - fixupPlugins: Wrap plugins for backward compatibility
 * - stripPlugins: Remove central plugins from nested configs
 * - stripParser: Remove parsers to prevent conflicts
 */

export { getEnabledPlugins } from './enabled-plugins.js';
export { flattenPlugins } from './flatten.js';
export { fixupPlugins } from './fixup.js';
export { stripPlugins } from './strip.js';
export { stripParser } from './parser.js';
