import { describe, it, expect } from 'vitest';

// Test suite for the gulp-smacss module.
describe('gulp-smacss/index.js', () => {
  it('should export smacssOrder array', async () => {
    const module = await import('./index.js');

    expect(Array.isArray(module.smacssOrder)).toBe(true);
  });

  it('should include expected SMACSS properties in the order', async () => {
    const module = await import('./index.js');

    expect(module.smacssOrder).toContain('position');
    expect(module.smacssOrder).toContain('display');
    expect(module.smacssOrder).toContain('margin');
    expect(module.smacssOrder).toContain('border');
    expect(module.smacssOrder).toContain('color');
  });
});
