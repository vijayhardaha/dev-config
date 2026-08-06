/**
 * Removes the parser from individual configs when main config provides one.
 *
 * Prevents parser conflicts (e.g., eslint-config-next/parser vs \@typescript-eslint/parser).
 * Cleans up empty languageOptions objects after parser removal.
 *
 * @param {Array<object>} flatConfigs - Flat config array.
 *
 * @returns {Array<object>} Config array with parsers removed.
 *
 * @example
 * const stripped = stripParser([
 *   {
 *     languageOptions: {
 *       parser: typescriptParser,
 *       sourceType: 'module'
 *     }
 *   }
 * ]);
 * // Returns: [{ languageOptions: { sourceType: 'module' } }]
 */
export function stripParser(flatConfigs) {
  return flatConfigs.map((config) => {
    if (!config.languageOptions?.parser) return config;

    const languageOptions = { ...config.languageOptions };
    delete languageOptions.parser;

    return Object.keys(languageOptions).length > 0
      ? { ...config, languageOptions }
      : { ...config, languageOptions: undefined };
  });
}
