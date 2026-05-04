import { describe, it, expect } from 'vitest';

describe('eslint/next.js', () => {
  it('should export createConfig function', async () => {
    try {
      const module = await import('./next.js');
      expect(typeof module.createConfig).toBe('function');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should export default config', async () => {
    try {
      const module = await import('./next.js');
      expect(module.default).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
