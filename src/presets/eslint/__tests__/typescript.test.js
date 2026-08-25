import { describe, it, expect } from 'vitest';

describe('eslint/typescript.js', () => {
  it('should export createConfig function', async () => {
    const module = await import('../typescript.js');

    expect(typeof module.createConfig).toBe('function');
  });

  it('should export default config', async () => {
    const module = await import('../typescript.js');

    expect(module.default).toBeDefined();
  });

  it('should include additional file patterns from options', async () => {
    const module = await import('../typescript.js');
    const result = module.createConfig({ files: ['custom/**/*.ts'] });
    const configObject = result.at(-1);

    expect(configObject.files).toContain('custom/**/*.ts');
  });
});
