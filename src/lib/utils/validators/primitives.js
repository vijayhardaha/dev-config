/**
 * Primitive type validators: string, boolean, number, URL.
 */

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
