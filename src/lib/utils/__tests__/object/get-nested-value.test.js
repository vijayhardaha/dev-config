import { describe, expect, it } from 'vitest';

import { getNestedValue } from '../../object/get-nested-value.js';

describe('utils/object/getNestedValue', () => {
  it('reads a top-level value', () => {
    expect(getNestedValue({ a: 42 }, 'a')).toBe(42);
  });

  it('reads a deeply nested value', () => {
    expect(getNestedValue({ a: { b: { c: 42 } } }, 'a.b.c')).toBe(42);
  });

  it('returns the default when path is missing', () => {
    expect(getNestedValue({ a: 1 }, 'b.c', 'fallback')).toBe('fallback');
  });

  it('returns the default when traversing a non-object', () => {
    expect(getNestedValue({ a: null }, 'a.b', 'fallback')).toBe('fallback');
  });
});
