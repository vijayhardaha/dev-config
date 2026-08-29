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

  it('should format all file types at the top level', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.files.includes).toEqual(['**']);
  });

  it('should scope the linter to TypeScript source files', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.includes).toEqual(['**/*.{ts,tsx,mts,cts}']);
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
    expect(module.default.formatter.includes).toContain('!**/bun.lock');
  });

  it('should respect gitignore via the vcs config', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.vcs.enabled).toBe(true);
    expect(module.default.vcs.clientKind).toBe('git');
    expect(module.default.vcs.useIgnoreFile).toBe(true);
  });

  it('should parse Tailwind v4 css directives', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.css.parser.tailwindDirectives).toBe(true);
  });
});
