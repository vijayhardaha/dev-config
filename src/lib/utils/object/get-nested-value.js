/**
 * Get a nested property from an object using dot notation.
 *
 * @param {object} obj - Object to search.
 * @param {string} path - Dot-notated path (e.g., 'a.b.c').
 * @param {(object | Array | string | number | boolean | null | undefined)} [defaultValue] - Value if path not found.
 *
 * @returns {(object | Array | string | number | boolean | null | undefined)} Property value or default.
 *
 * @example
 * const value = getNestedValue({ a: { b: { c: 42 } } }, 'a.b.c');
 * // Returns: 42
 */
export function getNestedValue(obj, path, defaultValue = undefined) {
  const keys = path.split('.');
  let current = obj;

  for (const key of keys) {
    if (typeof current === 'object' && current !== null && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }

  return current;
}
