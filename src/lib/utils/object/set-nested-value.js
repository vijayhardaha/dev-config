/**
 * Set a nested property in an object using dot notation.
 *
 * @param {object} obj - Object to modify.
 * @param {string} path - Dot-notated path (e.g., 'a.b.c').
 * @param {(object | Array | string | number | boolean | null)} value - Value to set.
 *
 * @returns {object} Modified object.
 *
 * @example
 * const obj = {};
 * setNestedValue(obj, 'a.b.c', 42);
 * // obj is now: { a: { b: { c: 42 } } }
 */
export function setNestedValue(obj, path, value) {
  const keys = path.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return obj;
}
