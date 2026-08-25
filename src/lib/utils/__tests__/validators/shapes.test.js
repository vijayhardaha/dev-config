import { describe, expect, it } from 'vitest';

import { validateObject, validateObjectKeys, validateRules, validateFilePatterns } from '../../validators/shapes.js';

describe('utils/validators/shapes', () => {
  describe('validateObject', () => {
    it('accepts a plain object', () => {
      expect(() => validateObject({ a: 1 })).not.toThrow();
    });

    it('throws on null', () => {
      expect(() => validateObject(null)).toThrow(TypeError);
    });

    it('throws on arrays', () => {
      expect(() => validateObject([])).toThrow(TypeError);
    });
  });

  describe('validateObjectKeys', () => {
    it('accepts when all required keys are present', () => {
      expect(() => validateObjectKeys({ a: 1, b: 2 }, ['a', 'b'])).not.toThrow();
    });

    it('throws when a required key is missing', () => {
      expect(() => validateObjectKeys({ a: 1 }, ['a', 'b'])).toThrow(/missing required key: "b"/);
    });

    it('throws on a non-object', () => {
      expect(() => validateObjectKeys(null, ['a'])).toThrow(TypeError);
    });
  });

  describe('validateRules', () => {
    it('accepts a rules object', () => {
      expect(() => validateRules({ 'no-console': 'error' })).not.toThrow();
    });

    it('throws on null or arrays', () => {
      expect(() => validateRules(null)).toThrow(TypeError);
      expect(() => validateRules([])).toThrow(TypeError);
    });
  });

  describe('validateFilePatterns', () => {
    it('accepts an array of string patterns', () => {
      expect(() => validateFilePatterns(['*.ts', '*.js'])).not.toThrow();
    });

    it('throws on a non-array', () => {
      expect(() => validateFilePatterns('*.ts')).toThrow(TypeError);
    });

    it('throws when a pattern is not a string', () => {
      expect(() => validateFilePatterns(['*.ts', 42])).toThrow(/File patterns\[1\]/);
    });
  });
});
