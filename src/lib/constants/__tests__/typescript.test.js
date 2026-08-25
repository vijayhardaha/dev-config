import { describe, expect, it } from 'vitest';

import { TYPESCRIPT } from '../typescript.js';

describe('constants/typescript', () => {
  it('has compiler options', () => {
    expect(TYPESCRIPT.COMPILER_OPTIONS.target).toBe('ES2020');
    expect(TYPESCRIPT.COMPILER_OPTIONS.strict).toBe(true);
    expect(TYPESCRIPT.COMPILER_OPTIONS.skipLibCheck).toBe(true);
  });

  it('has library definitions', () => {
    expect(TYPESCRIPT.COMPILER_OPTIONS.lib).toContain('ES2020');
    expect(TYPESCRIPT.COMPILER_OPTIONS.lib).toContain('DOM');
  });
});
