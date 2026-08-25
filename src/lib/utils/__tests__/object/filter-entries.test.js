import { describe, expect, it } from 'vitest';

import { filterObjectEntries } from '../../object/filter-entries.js';

describe('utils/object/filterObjectEntries', () => {
  it('filters object entries by predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = filterObjectEntries(obj, ([key]) => key !== 'b');
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('returns an empty object when all entries are filtered out', () => {
    const result = filterObjectEntries({ a: 1, b: 2 }, () => false);
    expect(result).toEqual({});
  });
});
