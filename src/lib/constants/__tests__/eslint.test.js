import { describe, expect, it } from 'vitest';

import { ESLINT } from '../eslint.js';

describe('constants/eslint', () => {
  it('has file patterns for all JavaScript file types', () => {
    expect(ESLINT.FILES.JAVASCRIPT).toContain('**/*.{js,mjs,cjs}');
    expect(ESLINT.FILES.TYPESCRIPT).toContain('**/*.{ts,mts,cts}');
    expect(ESLINT.FILES.JSX).toContain('**/*.{jsx,tsx}');
  });

  it('has FILE_PATTERNS with and without TypeScript', () => {
    expect(ESLINT.FILE_PATTERNS.withTs).toBeDefined();
    expect(ESLINT.FILE_PATTERNS.withoutTs).toBeDefined();
    expect(Array.isArray(ESLINT.FILE_PATTERNS.withTs)).toBe(true);
  });
});
