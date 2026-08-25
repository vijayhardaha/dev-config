/**
 * Numeric range validator.
 */

import { validateNumber } from './primitives.js';

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
