import { describe, expect, it } from 'vitest';

import {
  validateString,
  validateNonEmptyString,
  validateBoolean,
  validateNumber,
  validateUrl,
} from '../../validators/primitives.js';

describe('utils/validators/primitives', () => {
  describe('validateString', () => {
    it('accepts a string', () => {
      expect(() => validateString('hello')).not.toThrow();
    });

    it('throws on a non-string', () => {
      expect(() => validateString(42)).toThrow(TypeError);
    });

    it('uses the field name in the error', () => {
      expect(() => validateString(42, 'siteUrl')).toThrow(/siteUrl/);
    });
  });

  describe('validateNonEmptyString', () => {
    it('accepts a non-empty string', () => {
      expect(() => validateNonEmptyString('hello')).not.toThrow();
    });

    it('throws on empty string', () => {
      expect(() => validateNonEmptyString('   ')).toThrow(/cannot be empty/);
    });

    it('throws on a non-string', () => {
      expect(() => validateNonEmptyString(42)).toThrow(TypeError);
    });
  });

  describe('validateBoolean', () => {
    it('accepts true and false', () => {
      expect(() => validateBoolean(true)).not.toThrow();
      expect(() => validateBoolean(false)).not.toThrow();
    });

    it('throws on truthy non-booleans', () => {
      expect(() => validateBoolean(1)).toThrow(TypeError);
      expect(() => validateBoolean('true')).toThrow(TypeError);
    });
  });

  describe('validateNumber', () => {
    it('accepts finite numbers', () => {
      expect(() => validateNumber(42)).not.toThrow();
      expect(() => validateNumber(0)).not.toThrow();
    });

    it('throws on NaN and Infinity', () => {
      expect(() => validateNumber(NaN)).toThrow(TypeError);
      expect(() => validateNumber(Infinity)).toThrow(TypeError);
    });

    it('throws on non-numbers', () => {
      expect(() => validateNumber('42')).toThrow(TypeError);
    });
  });

  describe('validateUrl', () => {
    it('accepts a valid URL', () => {
      expect(() => validateUrl('https://example.com')).not.toThrow();
    });

    it('throws on an empty string', () => {
      expect(() => validateUrl('')).toThrow(/cannot be empty/);
    });

    it('throws on a non-string', () => {
      expect(() => validateUrl(42)).toThrow(TypeError);
    });

    it('throws on a malformed URL', () => {
      expect(() => validateUrl('not a url')).toThrow(/is not a valid URL/);
    });
  });
});
