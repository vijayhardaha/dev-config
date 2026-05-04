import { describe, it, expect } from 'vitest';

describe('stylelint/index.js', () => {
  it('should export default config object', async () => {
    const module = await import('./index.js');
    expect(typeof module.default).toBe('object');
  });

  it('should have extends property', async () => {
    const module = await import('./index.js');
    expect(Array.isArray(module.default.extends)).toBe(true);
  });

  it('should have plugins property', async () => {
    const module = await import('./index.js');
    expect(Array.isArray(module.default.plugins)).toBe(true);
  });

  it('should have rules property', async () => {
    const module = await import('./index.js');
    expect(typeof module.default.rules).toBe('object');
  });

  it('should have disabled rules', async () => {
    const module = await import('./index.js');
    expect(module.default.rules['selector-class-pattern']).toBeNull();
    expect(module.default.rules['selector-id-pattern']).toBeNull();
  });
});
