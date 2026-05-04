import { describe, it, expect } from 'vitest';

describe('tsconfig/index.json', () => {
  it('should be a valid JSON file', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(typeof module.default).toBe('object');
  });

  it('should have compilerOptions', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(module.default.compilerOptions).toBeDefined();
    expect(typeof module.default.compilerOptions).toBe('object');
  });

  it('should have correct target', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(module.default.compilerOptions.target).toBe('ES2024');
  });

  it('should have jsx configured', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(module.default.compilerOptions.jsx).toBe('react-jsx');
  });

  it('should have strict mode enabled', async () => {
    const module = await import('./index.json', { assert: { type: 'json' } });
    expect(module.default.compilerOptions.strict).toBe(true);
  });
});
