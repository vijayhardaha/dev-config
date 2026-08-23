import { describe, it, expect } from 'vitest';

import {
  mergeDeep,
  filterObjectEntries,
  createFileOverride,
  getNestedValue,
  setNestedValue,
  flattenArray,
  compactArray,
  isPlainObject,
} from '../config-utils.js';

describe('Config Utils', () => {
  describe('mergeDeep', () => {
    it('should merge objects deeply', () => {
      const result = mergeDeep({ a: { b: 1 } }, { a: { c: 2 } });
      expect(result).toEqual({ a: { b: 1, c: 2 } });
    });

    it('should override values', () => {
      const result = mergeDeep({ a: 1 }, { a: 2 });
      expect(result).toEqual({ a: 2 });
    });

    it('should handle multiple sources', () => {
      const result = mergeDeep({ a: 1 }, { b: 2 }, { c: 3 });
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should replace arrays instead of merging', () => {
      const result = mergeDeep({ arr: [1, 2] }, { arr: [3] });
      expect(result).toEqual({ arr: [3] });
    });

    it('should skip non-object sources and initialize missing nested keys', () => {
      const result = mergeDeep({ a: 1 }, null, { b: { c: 2 } });
      expect(result).toEqual({ a: 1, b: { c: 2 } });
    });
  });

  describe('filterObjectEntries', () => {
    it('should filter object entries', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = filterObjectEntries(obj, ([key]) => key !== 'b');
      expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should filter by value', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = filterObjectEntries(obj, ([, value]) => value > 1);
      expect(result).toEqual({ b: 2, c: 3 });
    });
  });

  describe('createFileOverride', () => {
    it('should create file override config', () => {
      const result = createFileOverride(['*.py'], { tabWidth: 4 });
      expect(result).toEqual({ files: ['*.py'], options: { tabWidth: 4 } });
    });
  });

  describe('getNestedValue', () => {
    it('should get nested value with dot notation', () => {
      const obj = { a: { b: { c: 42 } } };
      expect(getNestedValue(obj, 'a.b.c')).toBe(42);
    });

    it('should return default if path not found', () => {
      const obj = { a: { b: 1 } };
      expect(getNestedValue(obj, 'a.b.c.d', 'default')).toBe('default');
    });

    it('should handle undefined as default', () => {
      const obj = {};
      expect(getNestedValue(obj, 'a.b')).toBeUndefined();
    });
  });

  describe('setNestedValue', () => {
    it('should set nested value with dot notation', () => {
      const obj = {};
      setNestedValue(obj, 'a.b.c', 42);
      expect(obj).toEqual({ a: { b: { c: 42 } } });
    });

    it('should create intermediate objects', () => {
      const obj = { a: {} };
      setNestedValue(obj, 'a.b.c.d', 'value');
      expect(obj.a.b.c.d).toBe('value');
    });

    it('should return modified object', () => {
      const obj = {};
      const result = setNestedValue(obj, 'x', 1);
      expect(result).toBe(obj);
    });
  });

  describe('flattenArray', () => {
    it('should flatten arrays', () => {
      const result = flattenArray([1, [2, 3], 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should handle mixed arrays and objects', () => {
      const result = flattenArray([{ a: 1 }, [{ b: 2 }, { c: 3 }]]);
      expect(result).toEqual([{ a: 1 }, { b: 2 }, { c: 3 }]);
    });
  });

  describe('compactArray', () => {
    it('should remove falsy values', () => {
      const result = compactArray([1, null, 2, undefined, 3, false, 0, '', 4]);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should keep truthy values', () => {
      const result = compactArray([true, 'string', {}, [], 1]);
      expect(result).toEqual([true, 'string', {}, [], 1]);
    });
  });

  describe('isPlainObject', () => {
    it('should identify plain objects', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
    });

    it('should reject arrays', () => {
      expect(isPlainObject([])).toBe(false);
    });

    it('should reject null', () => {
      expect(isPlainObject(null)).toBe(false);
    });

    it('should reject special objects', () => {
      expect(isPlainObject(new Date())).toBe(false);
      expect(isPlainObject(/regex/)).toBe(false);
      expect(isPlainObject(new Map())).toBe(false);
    });

    it('should reject primitives', () => {
      expect(isPlainObject('string')).toBe(false);
      expect(isPlainObject(42)).toBe(false);
      expect(isPlainObject(true)).toBe(false);
    });
  });
});
