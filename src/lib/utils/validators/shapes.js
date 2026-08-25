/**
 * Object and structural shape validators.
 */

import { validateStringArray } from './collections.js';

/**
 * Validates that a value is an object.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not an object or is null.
 */
export function validateObject(value, fieldName = 'Object') {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`${fieldName} must be an object, got ${typeof value}`);
  }
}

/**
 * Validates that an object has specific required keys.
 *
 * @param {unknown} obj - Object to validate.
 * @param {string[]} requiredKeys - Keys that must exist.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If obj is not an object.
 * @throws {Error} If any required key is missing.
 */
export function validateObjectKeys(obj, requiredKeys, fieldName = 'Object') {
  validateObject(obj, fieldName);

  for (const key of requiredKeys) {
    if (!(key in obj)) {
      throw new Error(`${fieldName} is missing required key: "${key}"`);
    }
  }
}

/**
 * Validates configuration rules object.
 *
 * @param {unknown} rules - Rules object to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If rules is not an object.
 */
export function validateRules(rules, fieldName = 'Rules') {
  if (typeof rules !== 'object' || rules === null || Array.isArray(rules)) {
    throw new TypeError(`${fieldName} must be an object, got ${typeof rules}`);
  }
}

/**
 * Validates file patterns array.
 *
 * @param {unknown} patterns - File patterns to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If patterns is not an array.
 * @throws {TypeError} If any pattern is not a string.
 */
export function validateFilePatterns(patterns, fieldName = 'File patterns') {
  validateStringArray(patterns, fieldName);
}
