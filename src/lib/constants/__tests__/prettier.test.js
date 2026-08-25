import { describe, expect, it } from 'vitest';

import { PRETTIER } from '../prettier.js';

describe('constants/prettier', () => {
  it('has base formatting settings', () => {
    expect(PRETTIER.BASE.printWidth).toBe(120);
    expect(PRETTIER.BASE.tabWidth).toBe(2);
    expect(PRETTIER.BASE.semi).toBe(true);
    expect(PRETTIER.BASE.singleQuote).toBe(false);
  });

  it('has indentation settings', () => {
    expect(PRETTIER.INDENTATION.BACKEND).toBe(4);
    expect(PRETTIER.INDENTATION.FRONTEND).toBe(2);
  });

  it('has file patterns for overrides', () => {
    expect(PRETTIER.FILE_PATTERNS.BACKEND).toBeDefined();
    expect(PRETTIER.FILE_PATTERNS.JAVASCRIPT).toBeDefined();
    expect(PRETTIER.FILE_PATTERNS.STYLESHEETS).toBeDefined();
  });

  it('has override options', () => {
    expect(PRETTIER.OVERRIDES.BACKEND.tabWidth).toBe(4);
    expect(PRETTIER.OVERRIDES.JAVASCRIPT.singleQuote).toBe(true);
  });
});
