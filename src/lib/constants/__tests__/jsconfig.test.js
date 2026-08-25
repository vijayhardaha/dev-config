import { describe, expect, it } from 'vitest';

import { JSCONFIG } from '../jsconfig.js';

describe('constants/jsconfig', () => {
  it('has compiler options', () => {
    expect(JSCONFIG.COMPILER_OPTIONS.target).toBe('ES2020');
    expect(JSCONFIG.COMPILER_OPTIONS.strict).toBe(false);
  });

  it('allows JavaScript and JSON', () => {
    expect(JSCONFIG.COMPILER_OPTIONS.allowJs).toBe(true);
    expect(JSCONFIG.COMPILER_OPTIONS.resolveJsonModule).toBe(true);
  });
});
