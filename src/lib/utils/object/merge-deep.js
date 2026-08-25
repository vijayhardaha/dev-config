/**
 * Deep merge two objects with override capability.
 *
 * Later values override earlier values. Arrays are replaced, not merged.
 *
 * @param {object} target - Target object.
 * @param {...object} sources - Source objects to merge.
 *
 * @returns {object} Merged object.
 *
 * @example
 * const merged = mergeDeep(
 *   { a: 1, nested: { b: 2 } },
 *   { nested: { c: 3 } }
 * );
 * // Returns: { a: 1, nested: { b: 2, c: 3 } }
 */
export function mergeDeep(target, ...sources) {
  if (sources.length === 0) return target;

  const source = sources.shift();

  if (typeof target !== 'object' || target === null || typeof source !== 'object' || source === null) {
    return mergeDeep(target, ...sources);
  }

  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      if (!(key in target)) target[key] = {};
      mergeDeep(target[key], value);
      continue;
    }

    target[key] = value;
  }

  return mergeDeep(target, ...sources);
}
