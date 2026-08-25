import { fixupPluginRules } from '@eslint/compat';

/**
 * Wraps plugin rules with fixupPluginRules for backward compatibility.
 *
 * Ensures that plugins from older ESLint versions are properly wrapped
 * to work with ESLint 10+ flat config format.
 *
 * @param {Array<object>} flatConfigs - Flat config array.
 *
 * @returns {Array<object>} Config array with wrapped plugin rules.
 *
 * @example
 * const wrapped = fixupPlugins([
 *   {
 *     plugins: {
 *       'legacy-plugin': legacyPluginInstance
 *     }
 *   }
 * ]);
 */
export function fixupPlugins(flatConfigs) {
  return flatConfigs.map((config) => {
    if (!config.plugins) return config;

    const fixed = { ...config, plugins: {} };

    for (const [name, plugin] of Object.entries(config.plugins)) {
      fixed.plugins[name] = fixupPluginRules(plugin);
    }

    return fixed;
  });
}
