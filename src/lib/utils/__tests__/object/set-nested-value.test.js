import { describe, expect, it } from 'vitest';

import { setNestedValue } from '../../object/set-nested-value.js';

describe('utils/object/setNestedValue', () => {
  it('sets a top-level value', () => {
    const obj = {};
    setNestedValue(obj, 'a', 42);
    expect(obj).toEqual({ a: 42 });
  });

  it('creates nested objects on the way down', () => {
    const obj = {};
    setNestedValue(obj, 'a.b.c', 42);
    expect(obj).toEqual({ a: { b: { c: 42 } } });
  });

  it('overwrites an existing value', () => {
    const obj = { a: { b: 1 } };
    setNestedValue(obj, 'a.b', 2);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it('replaces a non-object intermediate with an object', () => {
    const obj = { a: 1 };
    setNestedValue(obj, 'a.b', 2);
    expect(obj).toEqual({ a: { b: 2 } });
  });

  it('returns the modified object', () => {
    const obj = {};
    const result = setNestedValue(obj, 'a', 1);
    expect(result).toBe(obj);
  });
});
