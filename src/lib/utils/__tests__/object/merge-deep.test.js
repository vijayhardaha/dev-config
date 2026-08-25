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
});
