import { describe, expect, it } from 'vitest';

import { HUSKY } from '../husky.js';

describe('constants/husky', () => {
  it('has version defined', () => {
    expect(HUSKY.DEFAULTS.version).toBe('9');
  });
});
