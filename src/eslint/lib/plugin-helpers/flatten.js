/**
 * Flattens a mixed list of config arrays and objects into a single array.
 *
 * Handles nested arrays from plugin configurations that may contain
 * both direct config objects and arrays of configs.
 *
 * @param {Array<Array | object>} plugins - Mixed list of flat config arrays and objects.
 *
 * @returns {Array<object>} Flattened config array.
 *
 * @example
 * const flattened = flattenPlugins([
 *   { rules: { 'rule-1': 'error' } },
 *   [{ rules: { 'rule-2': 'error' } }],
 *   [{ rules: { 'rule-3': 'error' } }, { rules: { 'rule-4': 'error' } }]
 * ]);
 * // Returns: [{ rules: {...} }, { rules: {...} }, { rules: {...} }, { rules: {...} }]
 */
export function flattenPlugins(plugins) {
  const result = [];

  for (const plugin of plugins) {
    if (Array.isArray(plugin)) {
      result.push(...plugin);
    } else if (typeof plugin === 'object' && plugin !== null) {
      result.push(plugin);
    }
  }

  return result;
}
