/**
 * Filters conditional plugins based on user options.
 *
 * This helper enables/disables plugins based on corresponding options,
 * supporting both single values and array configurations.
 *
 * @param {object} conditionalPlugins - Plugin map keyed by option name.
 * @param {object} options - User-provided options.
 *
 * @returns {Array<object>} Flat config objects for enabled plugins.
 *
 * @example
 * const plugins = getEnabledPlugins(
 *   {
 *     typescript: tsPlugin,
 *     react: [reactPlugin, reactHooksPlugin]
 *   },
 *   { typescript: true, react: false }
 * );
 * // Returns: [tsPlugin]
 */
export function getEnabledPlugins(conditionalPlugins, options) {
  return Object.entries(conditionalPlugins)
    .filter(([key]) => options[key])
    .flatMap(([, value]) => (Array.isArray(value) ? value : [value]));
}
