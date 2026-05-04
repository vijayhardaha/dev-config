import { describe, it, expect } from 'vitest';

describe('commitlint/index.js', () => {
  it('should export default config object', async () => {
    const module = await import('./index.js');
    expect(typeof module.default).toBe('object');
  });

  it('should have extends property', async () => {
    const module = await import('./index.js');
    expect(Array.isArray(module.default.extends)).toBe(true);
  });

  it('should have rules property', async () => {
    const module = await import('./index.js');
    expect(typeof module.default.rules).toBe('object');
  });

  it('should have header-max-length rule', async () => {
    const module = await import('./index.js');
    expect(module.default.rules['header-max-length']).toBeDefined();
  });

  it('should have scope-case rule', async () => {
    const module = await import('./index.js');
    expect(module.default.rules['scope-case']).toBeDefined();
  });
});
