import { describe, it, expect } from 'vitest';

describe('prettier/index.js', () => {
  it('should export default config object', async () => {
    const module = await import('./index.js');
    expect(typeof module.default).toBe('object');
  });

  it('should have correct Prettier configuration properties', async () => {
    const module = await import('./index.js');
    const config = module.default;
    expect(config.printWidth).toBe(120);
    expect(config.tabWidth).toBe(2);
    expect(config.useTabs).toBe(false);
    expect(config.semi).toBe(true);
    expect(config.singleQuote).toBe(false);
    expect(config.trailingComma).toBe('es5');
  });

  it('should have overrides for different file types', async () => {
    const module = await import('./index.js');
    const config = module.default;
    expect(Array.isArray(config.overrides)).toBe(true);
    expect(config.overrides.length).toBeGreaterThan(0);
  });
});
