/**
 * =====================================================================
 * Configuration Utilities
 * =====================================================================
 * Purpose: Shared utility functions for configuration builders.
 *          Common patterns used across multiple config modules.
 * Usage:   Import and use in config builders
 * =====================================================================
 */

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

/**
 * Create a configuration override for specific file patterns.
 *
 * @param {string[]} files - File patterns to match.
 * @param {object} options - Override options.
 *
 * @returns {object} Override configuration object.
 *
 * @example
 * const override = createFileOverride(['*.py'], { tabWidth: 4 });
 * // Returns: { files: ['*.py'], options: { tabWidth: 4 } }
 */
export function createFileOverride(files, options) {
  return { files, options };
}

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
