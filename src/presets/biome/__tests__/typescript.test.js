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

  it('should include TypeScript file patterns', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.files.includes).toContain('**/*.{ts,tsx,mts,cts}');
  });

  it('should enforce import type usage', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.nursery.useImportType).toBe('error');
  });

  it('should warn on explicit any', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.nursery.noExplicitAny).toBe('warn');
  });

  it('should not enable react or next domains', async () => {
    const module = await import('../typescript.json', { assert: { type: 'json' } });

    expect(module.default.linter.domains).toBeUndefined();
  });
});
