import { describe, expect, it } from 'vitest';

import { COMMITLINT } from '../commitlint.js';

describe('constants/commitlint', () => {
  it('has default configuration', () => {
    expect(COMMITLINT.DEFAULTS.extends).toContain('@commitlint/config-conventional');
  });
});
