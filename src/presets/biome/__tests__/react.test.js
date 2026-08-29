import { describe, it, expect } from 'vitest';

describe('biome/react.json', () => {
  it('should be a valid JSON file', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(typeof module.default).toBe('object');
  });

  it('should ship a $schema for editor IntelliSense', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.$schema).toMatch(/^https:\/\/biomejs\.dev\/schemas\//);
  });

  it('should enable the react domain', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.domains.react).toBe('recommended');
  });

  it('should enforce react rules', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.react.noUnknownProperty).toBe('error');
    expect(module.default.linter.rules.react.useJsxKeyInIterable).toBe('error');
  });

  it('should enforce react hooks rules', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.nursery.useExhaustiveDependencies).toBe('error');
    expect(module.default.linter.rules.nursery.useHookAtTopLevel).toBe('error');
  });

  it('should enable accessibility rules', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.a11y.recommended).toBe(true);
  });

  it('should not enable the next domain', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.domains.next).toBeUndefined();
    expect(module.default.linter.rules.next).toBeUndefined();
  });
});
