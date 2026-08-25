import { ESLint } from 'eslint';
import { describe, it, expect } from 'vitest';

describe('eslint/javascript.js', () => {
  it('should export createConfig function', async () => {
    const module = await import('../javascript.js');

    expect(typeof module.createConfig).toBe('function');
  });

  it('should export default config', async () => {
    const module = await import('../javascript.js');

    expect(module.default).toBeDefined();
  });

  it('should include recommended JavaScript rules', async () => {
    const module = await import('../javascript.js');
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: module.createConfig({ prettier: false, importOrder: false, jsdoc: false }),
    });

    const [result] = await eslint.lintText('const value = missing + 1;\n', { filePath: 'sample.js' });

    expect(result.messages.some((message) => message.ruleId === 'no-undef')).toBe(true);
  });
});
