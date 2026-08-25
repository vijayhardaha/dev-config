/**
 * Removes centrally-registered plugins from individual configs.
 *
 * Prevents "Cannot redefine plugin" errors when plugins are registered
 * at the root config level. Removes plugins by name from nested configs.
 *
 * @param {Array<object>} flatConfigs - Flat config array.
 * @param {Array<string>} pluginNames - Plugin names to strip from configs.
 *
 * @returns {Array<object>} Config array with specified plugins removed.
 *
 * @example
 * const stripped = stripPlugins(
 *   [
 *     { plugins: { prettier: prettierPlugin, eslint: eslintPlugin } },
 *     { plugins: { prettier: prettierPlugin } }
 *   ],
 *   ['prettier']
 * );
 * // prettier plugin removed from both configs
 */
export function stripPlugins(flatConfigs, pluginNames) {
  if (pluginNames.length === 0) return flatConfigs;

  const skip = new Set(pluginNames);

  return flatConfigs.map((config) => {
    if (!config.plugins) return config;

    const plugins = { ...config.plugins };

    for (const name of skip) {
      delete plugins[name];
    }

    if (Object.keys(plugins).length === 0) {
      const rest = { ...config };
      delete rest.plugins;

      return rest;
    }

    return { ...config, plugins };
  });
}
