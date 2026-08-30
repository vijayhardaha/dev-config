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

  it('should scope files to javascript-based types only', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.files.includes).toEqual([
      '**/*.{js,jsx,mjs,cjs}',
      '!**/assets',
      '!**/public',
      '!**/static',
      '!**/*.min.js',
    ]);
    expect(module.default.formatter.includes).toBeUndefined();
    expect(module.default.overrides).toBeUndefined();
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
    expect(module.default.javascript.formatter.operatorLinebreak).toBe('before');
  });

  it('should use single quotes for js and ts files with double quotes in jsx', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.javascript.formatter.quoteStyle).toBe('single');
    expect(module.default.javascript.formatter.jsxQuoteStyle).toBe('double');
  });

  it('should respect gitignore via the vcs config', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.vcs.enabled).toBe(true);
    expect(module.default.vcs.clientKind).toBe('git');
    expect(module.default.vcs.useIgnoreFile).toBe(true);
  });

  it('should enable organizeImports via assist actions', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.assist.enabled).toBe(true);
    expect(module.default.assist.actions.source.organizeImports).toBe('on');
  });

  it('should enable the linter on javascript files with the recommended preset', async () => {
    const module = await import('../js.json', { assert: { type: 'json' } });

    expect(module.default.linter.enabled).toBe(true);
    expect(module.default.linter.includes).toEqual(['**/*.{js,mjs,cjs,jsx}']);
    expect(module.default.linter.rules.preset).toBe('recommended');
  });
});
