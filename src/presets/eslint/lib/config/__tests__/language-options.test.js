import { describe, it, expect } from 'vitest';

describe('eslint/lib/config/language-options.js', () => {
  it('should export commonLanguageOptions object', async () => {
    const module = await import('../language-options.js');

    expect(typeof module.commonLanguageOptions).toBe('object');
  });

  it('should have correct language options properties', async () => {
    const module = await import('../language-options.js');

    expect(module.commonLanguageOptions.ecmaVersion).toBe('latest');
    expect(module.commonLanguageOptions.sourceType).toBe('module');
    expect(typeof module.commonLanguageOptions.globals).toBe('object');
  });
});
