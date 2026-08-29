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

  it('should enforce react rules in the correctness group', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.correctness.noUnknownProperty).toBe('error');
    expect(module.default.linter.rules.correctness.useJsxKeyInIterable).toBe('error');
  });

  it('should enforce react hooks rules in the correctness group', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.correctness.useHookAtTopLevel).toBe('error');
  });

  it('should use the recommended preset for base and accessibility rules', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.rules.preset).toBe('recommended');
  });

  it('should not enable the next domain', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.linter.domains.next).toBeUndefined();
  });

  it('should match the migrated prettier formatter settings', async () => {
    const module = await import('../react.json', { assert: { type: 'json' } });

    expect(module.default.formatter.lineWidth).toBe(120);
    expect(module.default.formatter.lineEnding).toBe('lf');
    expect(module.default.javascript.formatter.trailingCommas).toBe('es5');
    expect(module.default.formatter.includes).toContain('!**/node_modules/');
  });
});
