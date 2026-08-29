import { describe, it, expect } from 'vitest';

describe('biome/js.json', () => {
  it('should be a valid JSON file', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(typeof module.default).toBe('object');
  });

  it('should ship a $schema for editor IntelliSense', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.$schema).toMatch(/^https:\/\/biomejs\.dev\/schemas\//);
  });

  it('should include JavaScript file patterns', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.files.includes).toContain('**/*.{js,mjs,cjs}');
  });

  it('should enable the formatter with space indentation', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.formatter.enabled).toBe(true);
    expect(module.default.formatter.indentStyle).toBe('space');
    expect(module.default.formatter.indentWidth).toBe(2);
  });

  it('should enable organizeImports', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.organizeImports.enabled).toBe(true);
  });

  it('should enable the linter with recommended rules', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.linter.enabled).toBe(true);
    expect(module.default.linter.rules.recommended).toBe(true);
  });
});
