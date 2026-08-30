import { describe, it, expect } from 'vitest';

describe('biome/typescript.json', () => {
  it('should be a valid JSON file', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(typeof module.default).toBe('object');
  });

  it('should ship a $schema for editor IntelliSense', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.$schema).toMatch(/^https:\/\/biomejs\.dev\/schemas\//);
  });

  it('should scope files to javascript-based types only', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.files.includes).toEqual([
      '**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}',
      '!**/assets',
      '!**/public',
      '!**/static',
      '!**/*.min.js',
    ]);
  });

  it('should scope the linter to TypeScript and JSX source files', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.includes).toEqual(['**/*.{ts,tsx,mts,cts,jsx}']);
  });

  it('should enforce import type usage', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.style.useImportType).toBe('error');
  });

  it('should warn on explicit any', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.suspicious.noExplicitAny).toBe('warn');
  });

  it('should not enable react or next domains', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.domains).toBeUndefined();
  });

  it('should match the migrated prettier formatter settings', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.formatter.lineWidth).toBe(120);
    expect(module.default.formatter.lineEnding).toBe('lf');
    expect(module.default.javascript.formatter.trailingCommas).toBe('es5');
    expect(module.default.javascript.formatter.operatorLinebreak).toBe('before');
  });

  it('should respect gitignore via the vcs config', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.vcs.enabled).toBe(true);
    expect(module.default.vcs.clientKind).toBe('git');
    expect(module.default.vcs.useIgnoreFile).toBe(true);
  });
});
