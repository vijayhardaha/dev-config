/**
 * Check if a value is a plain object (not array, Date, etc.).
 *
 * @param {(object | Array | string | number | boolean | null)} value - Value to check.
 *
 * @returns {boolean} True if plain object.
 *
 * @example
 * isPlainObject({}) // true
 * isPlainObject([]) // false
 * isPlainObject(new Date()) // false
 */
export function isPlainObject(value) {
  return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;
}
