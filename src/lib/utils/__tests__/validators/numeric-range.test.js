import { describe, expect, it } from 'vitest';

import { validateNumberInRange } from '../../validators/numeric-range.js';

describe('utils/validators/numeric-range', () => {
  it('accepts a value within range', () => {
    expect(() => validateNumberInRange(5, 1, 10)).not.toThrow();
  });

  it('accepts the boundary values', () => {
    expect(() => validateNumberInRange(1, 1, 10)).not.toThrow();
    expect(() => validateNumberInRange(10, 1, 10)).not.toThrow();
  });

  it('throws when below the minimum', () => {
    expect(() => validateNumberInRange(0, 1, 10)).toThrow(/must be between 1 and 10/);
  });

  it('throws when above the maximum', () => {
    expect(() => validateNumberInRange(11, 1, 10)).toThrow(/must be between 1 and 10/);
  });

  it('throws on a non-number', () => {
    expect(() => validateNumberInRange('5', 1, 10)).toThrow(TypeError);
  });
});
