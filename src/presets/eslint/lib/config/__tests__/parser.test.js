import { describe, it, expect } from 'vitest';

describe('eslint/lib/config/parser.js', () => {
  it('should export commonParser object', async () => {
    const module = await import('../parser.js');

    expect(typeof module.commonParser).toBe('object');
    expect(module.commonParser.parser).toBeDefined();
  });
});
