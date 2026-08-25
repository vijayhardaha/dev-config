/**
 * Remove falsy values from an array.
 *
 * @param {Array} arr - Array to clean.
 *
 * @returns {Array} Array without falsy values.
 *
 * @example
 * const cleaned = compactArray([1, null, 2, undefined, 3, false]);
 * // Returns: [1, 2, 3]
 */
export function compactArray(arr) {
  return arr.filter(Boolean);
}
