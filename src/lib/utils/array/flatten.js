/**
 * Flatten an array of mixed arrays and objects.
 *
 * @param {Array} arr - Array to flatten (shallow).
 *
 * @returns {Array} Flattened array.
 *
 * @example
 * const flat = flattenArray([1, [2, 3], 4]);
 * // Returns: [1, 2, 3, 4]
 */
export function flattenArray(arr) {
  return arr.reduce((acc, item) => (Array.isArray(item) ? acc.concat(item) : acc.concat([item])), []);
}
