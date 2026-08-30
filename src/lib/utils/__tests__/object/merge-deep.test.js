import { describe, expect, it } from 'vitest';

import { mergeDeep } from '../../object/merge-deep.js';

describe('utils/object/mergeDeep', () => {
  it('merges objects deeply', () => {
    const result = mergeDeep({ a: { b: 1 } }, { a: { c: 2 } });
    expect(result).toEqual({ a: { b: 1, c: 2 } });
  });

  it('overrides values', () => {
    const result = mergeDeep({ a: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2 });
  });

  it('handles multiple sources', () => {
    const result = mergeDeep({ a: 1 }, { b: 2 }, { c: 3 });
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('replaces arrays instead of merging', () => {
    const result = mergeDeep({ arr: [1, 2] }, { arr: [3] });
    expect(result).toEqual({ arr: [3] });
  });

  it('skips non-object sources and initializes missing nested keys', () => {
    const result = mergeDeep({ a: 1 }, null, { b: { c: 2 } });
    expect(result).toEqual({ a: 1, b: { c: 2 } });
  });

  it('does not pollute Object.prototype through __proto__ keys', () => {
    const source = JSON.parse('{"__proto__":{"polluted":"yes"}}');

    mergeDeep({}, source);

    expect({}.polluted).toBeUndefined();
    expect(Object.prototype.polluted).toBeUndefined();
  });

  it('returns a non-plain-object target with inherited keys unchanged', () => {
    const shared = { value: 1 };
    const target = Object.create({ shared });

    const result = mergeDeep(target, { shared: { value: 2 } });

    expect(result).toBe(target);
    expect(shared.value).toBe(1);
  });

  it('keeps non-plain-object values intact by reference', () => {
    const date = new Date(0);
    const map = new Map();

    const result = mergeDeep({ a: null }, { d: date, m: map });

    expect(result.d).toBe(date);
    expect(result.m).toBe(map);
    expect(result.d instanceof Date).toBe(true);
  });

  it('replaces a non-plain-object target value before merging into it', () => {
    const result = mergeDeep({ list: ['a'] }, { list: { 0: 'z' } });

    expect(Array.isArray(result.list)).toBe(false);
    expect(result.list).toEqual({ 0: 'z' });
  });

  it('returns a non-plain-object target unchanged', () => {
    const target = [1, 2];

    const result = mergeDeep(target, { 0: 'z' });

    expect(result).toBe(target);
    expect(result).toEqual([1, 2]);
  });
});
