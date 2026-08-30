import { isPlainObject } from './is-plain-object.js';

/**
 * Deep merge two objects with override capability.
 *
 * Later values override earlier values. Arrays are replaced, not merged.
 * Only plain objects are merged recursively; any other object value (Date,
 * Map, class instance, etc.) is copied by reference. The target object is
 * mutated in place and returned. Source keys never reach the target
 * prototype, so prototype pollution via keys like `__proto__` is not
 * possible, and inherited keys are always treated as missing.
 *
 * @param {object} target - Target object (mutated in place).
 * @param {...object} sources - Source objects to merge.
 *
 * @returns {object} Merged object (same reference as `target`).
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

  if (!isPlainObject(target) || !isPlainObject(source)) {
    return mergeDeep(target, ...sources);
  }

  for (const [key, value] of Object.entries(source)) {
    if (isPlainObject(value)) {
      if (!Object.hasOwn(target, key) || !isPlainObject(target[key])) {
        target[key] = {};
      }
      mergeDeep(target[key], value);
      continue;
    }

    target[key] = value;
  }

  return mergeDeep(target, ...sources);
}
