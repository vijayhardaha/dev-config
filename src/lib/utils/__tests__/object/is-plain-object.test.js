import { describe, expect, it } from 'vitest';

import { isPlainObject } from '../../object/is-plain-object.js';

describe('utils/object/isPlainObject', () => {
  it('returns true for plain object literals', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject({ a: 1 })).toBe(true);
  });

  it('returns false for arrays', () => {
    expect(isPlainObject([])).toBe(false);
  });

  it('returns false for Date instances', () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it('returns false for null and primitives', () => {
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject('string')).toBe(false);
    expect(isPlainObject(42)).toBe(false);
    expect(isPlainObject(true)).toBe(false);
  });
});
