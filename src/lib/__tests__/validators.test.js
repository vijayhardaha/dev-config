import { describe, it, expect } from 'vitest';

import {
  validateUrl,
  validateArray,
  validateNonEmptyArray,
  validateObject,
  validateString,
  validateNonEmptyString,
  validateBoolean,
  validateNumber,
  validateNumberInRange,
  validateStringArray,
  validateObjectKeys,
  validateRules,
  validateFilePatterns,
} from '../validators.js';

describe('Validators', () => {
  describe('validateUrl', () => {
    it('should accept valid URLs', () => {
      expect(() => validateUrl('https://example.com')).not.toThrow();
      expect(() => validateUrl('http://localhost:3000')).not.toThrow();
    });

    it('should reject non-string URLs', () => {
      expect(() => validateUrl(123)).toThrow(TypeError);
      expect(() => validateUrl(null)).toThrow(TypeError);
    });

    it('should reject empty URLs', () => {
      expect(() => validateUrl('')).toThrow(Error);
      expect(() => validateUrl('   ')).toThrow(Error);
    });

    it('should reject invalid URLs', () => {
      expect(() => validateUrl('not a url')).toThrow(Error);
      expect(() => validateUrl('ht!@#tp://invalid')).toThrow(Error);
    });

    it('should use custom field name in error', () => {
      expect(() => validateUrl('invalid', 'Sitemap URL')).toThrow(/Sitemap URL/);
    });
  });

  describe('validateArray', () => {
    it('should accept arrays', () => {
      expect(() => validateArray([])).not.toThrow();
      expect(() => validateArray([1, 2, 3])).not.toThrow();
    });

    it('should reject non-arrays', () => {
      expect(() => validateArray('not an array')).toThrow(TypeError);
      expect(() => validateArray({ array: true })).toThrow(TypeError);
    });
  });

  describe('validateNonEmptyArray', () => {
    it('should accept non-empty arrays', () => {
      expect(() => validateNonEmptyArray([1])).not.toThrow();
    });

    it('should reject empty arrays', () => {
      expect(() => validateNonEmptyArray([])).toThrow(Error);
    });

    it('should reject non-arrays', () => {
      expect(() => validateNonEmptyArray('not an array')).toThrow(TypeError);
    });
  });

  describe('validateObject', () => {
    it('should accept objects', () => {
      expect(() => validateObject({})).not.toThrow();
      expect(() => validateObject({ key: 'value' })).not.toThrow();
    });

    it('should reject non-objects', () => {
      expect(() => validateObject('string')).toThrow(TypeError);
      expect(() => validateObject(123)).toThrow(TypeError);
    });

    it('should reject arrays', () => {
      expect(() => validateObject([1, 2, 3])).toThrow(TypeError);
    });

    it('should reject null', () => {
      expect(() => validateObject(null)).toThrow(TypeError);
    });
  });

  describe('validateString', () => {
    it('should accept strings', () => {
      expect(() => validateString('hello')).not.toThrow();
      expect(() => validateString('')).not.toThrow();
    });

    it('should reject non-strings', () => {
      expect(() => validateString(123)).toThrow(TypeError);
      expect(() => validateString(null)).toThrow(TypeError);
    });
  });

  describe('validateNonEmptyString', () => {
    it('should accept non-empty strings', () => {
      expect(() => validateNonEmptyString('hello')).not.toThrow();
    });

    it('should reject empty strings', () => {
      expect(() => validateNonEmptyString('')).toThrow(Error);
      expect(() => validateNonEmptyString('   ')).toThrow(Error);
    });

    it('should reject non-strings', () => {
      expect(() => validateNonEmptyString(123)).toThrow(TypeError);
    });
  });

  describe('validateBoolean', () => {
    it('should accept booleans', () => {
      expect(() => validateBoolean(true)).not.toThrow();
      expect(() => validateBoolean(false)).not.toThrow();
    });

    it('should reject non-booleans', () => {
      expect(() => validateBoolean(1)).toThrow(TypeError);
      expect(() => validateBoolean('true')).toThrow(TypeError);
    });
  });

  describe('validateNumber', () => {
    it('should accept valid numbers', () => {
      expect(() => validateNumber(42)).not.toThrow();
      expect(() => validateNumber(0)).not.toThrow();
      expect(() => validateNumber(-5)).not.toThrow();
    });

    it('should reject non-numbers', () => {
      expect(() => validateNumber('42')).toThrow(TypeError);
      expect(() => validateNumber(null)).toThrow(TypeError);
    });

    it('should reject NaN and Infinity', () => {
      expect(() => validateNumber(NaN)).toThrow(TypeError);
      expect(() => validateNumber(Infinity)).toThrow(TypeError);
    });
  });

  describe('validateNumberInRange', () => {
    it('should accept numbers within range', () => {
      expect(() => validateNumberInRange(0.5, 0, 1)).not.toThrow();
      expect(() => validateNumberInRange(0, 0, 1)).not.toThrow();
      expect(() => validateNumberInRange(1, 0, 1)).not.toThrow();
    });

    it('should reject numbers outside range', () => {
      expect(() => validateNumberInRange(-0.5, 0, 1)).toThrow(Error);
      expect(() => validateNumberInRange(1.5, 0, 1)).toThrow(Error);
    });

    it('should reject non-numbers', () => {
      expect(() => validateNumberInRange('0.5', 0, 1)).toThrow(TypeError);
    });
  });

  describe('validateStringArray', () => {
    it('should accept arrays of strings', () => {
      expect(() => validateStringArray(['a', 'b', 'c'])).not.toThrow();
      expect(() => validateStringArray([])).not.toThrow();
    });

    it('should reject arrays with non-strings', () => {
      expect(() => validateStringArray(['a', 123])).toThrow(TypeError);
    });

    it('should reject non-arrays', () => {
      expect(() => validateStringArray('not an array')).toThrow(TypeError);
    });
  });

  describe('validateObjectKeys', () => {
    it('should accept objects with required keys', () => {
      expect(() => validateObjectKeys({ name: 'test' }, ['name'])).not.toThrow();
      expect(() => validateObjectKeys({ name: 'test', age: 30 }, ['name', 'age'])).not.toThrow();
    });

    it('should accept objects with extra keys', () => {
      expect(() => validateObjectKeys({ name: 'test', age: 30 }, ['name'])).not.toThrow();
    });

    it('should reject objects missing required keys', () => {
      expect(() => validateObjectKeys({ name: 'test' }, ['name', 'age'])).toThrow(Error);
    });

    it('should reject non-objects', () => {
      expect(() => validateObjectKeys('not an object', ['key'])).toThrow(TypeError);
    });
  });

  describe('validateRules', () => {
    it('should accept rules objects', () => {
      expect(() => validateRules({ 'rule-name': 'error' })).not.toThrow();
      expect(() => validateRules({})).not.toThrow();
    });

    it('should reject non-objects', () => {
      expect(() => validateRules('not an object')).toThrow(TypeError);
    });

    it('should reject arrays', () => {
      expect(() => validateRules(['rule1', 'rule2'])).toThrow(TypeError);
    });
  });

  describe('validateFilePatterns', () => {
    it('should accept valid file patterns', () => {
      expect(() => validateFilePatterns(['**/*.js'])).not.toThrow();
      expect(() => validateFilePatterns(['**/*.js', '**/*.ts', '**/*.jsx'])).not.toThrow();
    });

    it('should reject arrays with non-strings', () => {
      expect(() => validateFilePatterns(['**/*.js', 123])).toThrow(TypeError);
    });

    it('should reject non-arrays', () => {
      expect(() => validateFilePatterns('**/*.js')).toThrow(TypeError);
    });
  });
});
