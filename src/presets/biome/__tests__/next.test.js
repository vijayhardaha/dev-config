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

  it('should enforce next rules', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.next.noHeadElement).toBe('error');
    expect(module.default.linter.rules.next.noImgElement).toBe('error');
    expect(module.default.linter.rules.next.noDocumentImportInPage).toBe('error');
  });

  it('should include react rules for the next stack', async () => {
    const module = await import('../next.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.react.noUnknownProperty).toBe('error');
    expect(module.default.linter.rules.nursery.useExhaustiveDependencies).toBe('error');
  });
});
