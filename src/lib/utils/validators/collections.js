/**
 * Collection validators: arrays and their element types.
 */

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
