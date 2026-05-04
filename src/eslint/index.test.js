import { describe, it, expect } from 'vitest';

describe('eslint/index.js', () => {
  it('should export createConfig function', async () => {
    const module = await import('./index.js');
    expect(typeof module.createConfig).toBe('function');
  });

  it('should export default config', async () => {
    const module = await import('./index.js');
    expect(module.default).toBeDefined();
  });
});
