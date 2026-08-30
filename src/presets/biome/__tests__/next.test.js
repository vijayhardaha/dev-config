import { describe, it, expect } from 'vitest';

describe('biome/next.json', () => {
  it('should be a valid JSON file', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(typeof module.default).toBe('object');
  });

  it('should ship a $schema for editor IntelliSense', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.$schema).toMatch(/^https:\/\/biomejs\.dev\/schemas\//);
  });

  it('should enable the react and next domains', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.linter.domains.react).toBe('recommended');
    expect(module.default.linter.domains.next).toBe('recommended');
  });

  it('should enforce next rules in their corrected groups', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.style.noHeadElement).toBe('error');
    expect(module.default.linter.rules.performance.noImgElement).toBe('error');
    expect(module.default.linter.rules.suspicious.noDocumentImportInPage).toBe('error');
  });

  it('should include react rules for the next stack', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.correctness.noUnknownProperty).toBe('error');
    expect(module.default.linter.rules.correctness.useHookAtTopLevel).toBe('error');
  });

  it('should match the migrated prettier formatter settings', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.formatter.lineWidth).toBe(120);
    expect(module.default.formatter.lineEnding).toBe('lf');
    expect(module.default.javascript.formatter.trailingCommas).toBe('es5');
    expect(module.default.javascript.formatter.operatorLinebreak).toBe('before');
  });

  it('should respect gitignore via the vcs config', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.vcs.enabled).toBe(true);
    expect(module.default.vcs.clientKind).toBe('git');
    expect(module.default.vcs.useIgnoreFile).toBe(true);
  });
});
