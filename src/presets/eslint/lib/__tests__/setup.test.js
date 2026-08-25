import { describe, it, expect } from 'vitest';

describe('eslint/lib/setup.js', () => {
  it('should export commonParser object', async () => {
    const module = await import('../setup.js');

    expect(typeof module.commonParser).toBe('object');
    expect(module.commonParser.parser).toBeDefined();
  });
});
