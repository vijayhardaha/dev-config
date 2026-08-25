/**
 * Filter object entries by a predicate function.
 *
 * @param {object} obj - Object to filter.
 * @param {(entry: [string, unknown], index: number, entries: [string, unknown][]) => boolean} predicate - Function that returns true to keep entries.
 *
 * @returns {object} Filtered object.
 *
 * @example
 * const filtered = filterObjectEntries(
 *   { a: 1, b: 2, c: 3 },
 *   ([key]) => key !== 'b'
 * );
 * // Returns: { a: 1, c: 3 }
 */
export function filterObjectEntries(obj, predicate) {
  return Object.fromEntries(Object.entries(obj).filter(predicate));
}
