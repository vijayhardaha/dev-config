import { describe, expect, it } from 'vitest';

import { validateArray, validateNonEmptyArray, validateStringArray } from '../../validators/collections.js';

describe('utils/validators/collections', () => {
  describe('validateArray', () => {
    it('accepts an array', () => {
      expect(() => validateArray([])).not.toThrow();
      expect(() => validateArray([1, 2])).not.toThrow();
    });

    it('throws on a non-array', () => {
      expect(() => validateArray('hello')).toThrow(TypeError);
      expect(() => validateArray({})).toThrow(TypeError);
    });
  });

  describe('validateNonEmptyArray', () => {
    it('accepts a non-empty array', () => {
      expect(() => validateNonEmptyArray([1])).not.toThrow();
    });

    it('throws on empty array', () => {
      expect(() => validateNonEmptyArray([])).toThrow(/cannot be empty/);
    });

    it('throws on a non-array', () => {
      expect(() => validateNonEmptyArray('hello')).toThrow(TypeError);
    });
  });

  describe('validateStringArray', () => {
    it('accepts an array of strings', () => {
      expect(() => validateStringArray(['a', 'b'])).not.toThrow();
    });

    it('throws when an item is not a string', () => {
      expect(() => validateStringArray(['a', 42])).toThrow(TypeError);
    });

    it('uses the field name and index in the error', () => {
      expect(() => validateStringArray(['a', 42], 'patterns')).toThrow(/patterns\[1\]/);
    });
  });
});
