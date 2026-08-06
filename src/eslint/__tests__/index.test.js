import { ESLint } from 'eslint';
import { describe, it, expect } from 'vitest';

// Test suite for the ESLint module's main entry point.
describe('eslint/index.js', () => {
  // Test that the module exports the createConfig function.
  it('should export createConfig function', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('../index.js');

    // Verify that createConfig is a function (used to create ESLint configs).
    expect(typeof module.createConfig).toBe('function');
  });

  // Test that the module exports a default configuration object.
  it('should export default config', async () => {
    // Dynamically import the index.js module to test its exports.
    const module = await import('../index.js');

    // Verify that the default export is defined (should be a base ESLint config object).
    expect(module.default).toBeDefined();
  });

  // Test that the JavaScript config catches basic correctness issues.
  it('should include recommended JavaScript rules', async () => {
    const module = await import('../index.js');
    const eslint = new ESLint({
      overrideConfigFile: true,
      overrideConfig: module.createConfig({ prettier: false, importOrder: false, jsdoc: false }),
    });

    const [result] = await eslint.lintText('const value = missing + 1;\n', { filePath: 'sample.js' });

    expect(result.messages.some((message) => message.ruleId === 'no-undef')).toBe(true);
  });
});
