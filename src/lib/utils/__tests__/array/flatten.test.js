import { describe, expect, it } from 'vitest';

import { flattenArray } from '../../array/flatten.js';

describe('utils/array/flattenArray', () => {
  it('flattens mixed arrays and items one level', () => {
    expect(flattenArray([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });

  it('returns the same array when already flat', () => {
    expect(flattenArray([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('returns an empty array for empty input', () => {
    expect(flattenArray([])).toEqual([]);
  });
});
