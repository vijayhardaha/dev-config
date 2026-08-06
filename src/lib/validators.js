/**
 * =====================================================================
 * Configuration Validators
 * =====================================================================
 * Purpose: Centralized validation functions for all configuration builders.
 *          Ensures consistent error handling and helpful error messages.
 * Usage:   Import validators and use in createConfig functions
 * =====================================================================
 */

/**
 * Validates that a URL is properly formatted.
 *
 * @param {string} url - URL to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If url is not a string.
 * @throws {Error} If url is empty.
 * @throws {Error} If url is not a valid URL.
 */
export function validateUrl(url, fieldName = 'URL') {
  if (typeof url !== 'string') {
    throw new TypeError(`${fieldName} must be a string, got ${typeof url}`);
  }

  if (url.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty`);
  }

  try {
    new URL(url);
  } catch {
    throw new Error(`Invalid ${fieldName}: "${url}" is not a valid URL`);
  }
}

/**
 * Validates that a value is an array.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not an array.
 */
export function validateArray(value, fieldName = 'Array') {
  if (!Array.isArray(value)) {
    throw new TypeError(`${fieldName} must be an array, got ${typeof value}`);
  }
}

/**
 * Validates that an array is not empty.
 *
 * @param {unknown[]} array - Array to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If array is not an array.
 * @throws {Error} If array is empty.
 */
export function validateNonEmptyArray(array, fieldName = 'Array') {
  validateArray(array, fieldName);

  if (array.length === 0) {
    throw new Error(`${fieldName} cannot be empty`);
  }
}

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
 * Validates that a value is a string.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not a string.
 */
export function validateString(value, fieldName = 'String') {
  if (typeof value !== 'string') {
    throw new TypeError(`${fieldName} must be a string, got ${typeof value}`);
  }
}

/**
 * Validates that a string is not empty.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not a string.
 * @throws {Error} If value is empty.
 */
export function validateNonEmptyString(value, fieldName = 'String') {
  validateString(value, fieldName);

  if (value.trim().length === 0) {
    throw new Error(`${fieldName} cannot be empty`);
  }
}

/**
 * Validates that a value is a boolean.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not a boolean.
 */
export function validateBoolean(value, fieldName = 'Boolean') {
  if (typeof value !== 'boolean') {
    throw new TypeError(`${fieldName} must be a boolean, got ${typeof value}`);
  }
}

/**
 * Validates that a value is a number.
 *
 * @param {unknown} value - Value to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not a number.
 * @throws {Error} If value is NaN or Infinity.
 */
export function validateNumber(value, fieldName = 'Number') {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(`${fieldName} must be a valid number, got ${typeof value}`);
  }
}

/**
 * Validates that a number is within a specific range.
 *
 * @param {unknown} value - Value to validate.
 * @param {number} min - Minimum allowed value (inclusive).
 * @param {number} max - Maximum allowed value (inclusive).
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If value is not a valid number.
 * @throws {Error} If value is outside the range.
 */
export function validateNumberInRange(value, min, max, fieldName = 'Number') {
  validateNumber(value, fieldName);

  if (value < min || value > max) {
    throw new Error(`${fieldName} must be between ${min} and ${max}, got ${value}`);
  }
}

/**
 * Validates that all array items are strings.
 *
 * @param {unknown[]} array - Array to validate.
 * @param {string} [fieldName] - Field name for error message.
 *
 * @throws {TypeError} If array is not an array.
 * @throws {TypeError} If any item is not a string.
 */
export function validateStringArray(array, fieldName = 'Array') {
  validateArray(array, fieldName);

  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] !== 'string') {
      throw new TypeError(`${fieldName}[${i}] must be a string, got ${typeof array[i]}`);
    }
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
