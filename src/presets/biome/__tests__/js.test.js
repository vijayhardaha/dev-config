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

  it('should match the migrated prettier line width and trailing commas', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.formatter.lineWidth).toBe(120);
    expect(module.default.formatter.lineEnding).toBe('lf');
    expect(module.default.javascript.formatter.trailingCommas).toBe('es5');
  });

  it('should use double quotes by default with a recursive single-quote js override', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.javascript.formatter.quoteStyle).toBe('double');
    const jsOverride = module.default.overrides.find((o) => o.includes.includes('**/*.js'));
    expect(jsOverride).toBeDefined();
    expect(jsOverride.javascript.formatter.quoteStyle).toBe('single');
  });

  it('should carry the formatter ignore list', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.formatter.includes).toContain('!**/node_modules/');
    expect(module.default.formatter.includes).toContain('!**/.next/');
  });

  it('should enable organizeImports via assist actions', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.assist.enabled).toBe(true);
    expect(module.default.assist.actions.source.organizeImports).toBe('on');
  });

  it('should enable the linter with the recommended preset', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.linter.enabled).toBe(true);
    expect(module.default.linter.rules.preset).toBe('recommended');
  });
});
