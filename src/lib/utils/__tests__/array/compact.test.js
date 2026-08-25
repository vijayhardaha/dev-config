import { describe, expect, it } from 'vitest';

import { compactArray } from '../../array/compact.js';

describe('utils/array/compactArray', () => {
  it('removes all falsy values', () => {
    expect(compactArray([1, null, 2, undefined, 3, false, 0, ''])).toEqual([1, 2, 3]);
  });

  it('returns an empty array when all values are falsy', () => {
    expect(compactArray([null, undefined, false, 0, ''])).toEqual([]);
  });
});
