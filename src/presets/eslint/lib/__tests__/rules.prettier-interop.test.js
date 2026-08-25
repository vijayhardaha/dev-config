import { describe, expect, it, vi } from 'vitest';

// Shared handle to stub prettier.resolveConfig before modules evaluate.
const mockResolveConfig = vi.hoisted(() => vi.fn());

// Intercept prettier so entry-point detection can be simulated without
// touching real consumer configs on disk.
vi.mock('prettier', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, resolveConfig: mockResolveConfig };
});

describe('eslint/lib/rules.js with prettier-plugin-tailwindcss', () => {
  it('drops ordering and wrapping rules when prettier-plugin-tailwindcss is active', async () => {
    mockResolveConfig.mockResolvedValue({ plugins: ['prettier-plugin-tailwindcss'] });

    const rules = await import('../rules.js');
    const result = rules.tailwindRules();

    expect(result['better-tailwindcss/enforce-consistent-class-order']).toBeUndefined();
    expect(result['better-tailwindcss/enforce-consistent-line-wrapping']).toBeUndefined();

    expect(result['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
    expect(result['better-tailwindcss/no-unnecessary-whitespace']).toBe('warn');
    expect(result['tailwindcss/no-unnecessary-arbitrary-value']).toBe('warn');
  });

  it('keeps ordering and wrapping rules without the prettier plugin', async () => {
    mockResolveConfig.mockResolvedValue({});

    vi.resetModules();
    const rules = await import('../rules.js');
    const result = rules.tailwindRules();

    expect(result['better-tailwindcss/enforce-consistent-class-order']).toBe('warn');
    expect(result['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual(['warn', { printWidth: 120 }]);
    expect(result['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
    expect(result['better-tailwindcss/no-unnecessary-whitespace']).toBe('warn');
  });

  it('falls back to full rules when prettier config resolution fails', async () => {
    mockResolveConfig.mockRejectedValue(new Error('simulated resolution failure'));

    vi.resetModules();
    const rules = await import('../rules.js');
    const result = rules.tailwindRules();

    expect(result['better-tailwindcss/enforce-consistent-class-order']).toBe('warn');
    expect(result['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual(['warn', { printWidth: 120 }]);
  });

  it('logs an interop notice under DEBUG when the prettier plugin is active', async () => {
    process.env.DEBUG = 'eslint';
    mockResolveConfig.mockResolvedValue({ plugins: ['prettier-plugin-tailwindcss'] });
    vi.resetModules();
    const debugCalls = [];
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation((...args) => debugCalls.push(args.join(' ')));
    debugSpy.mockClear();

    // Re-import so top-level detection runs again under this env.
    await import('../rules.js');

    expect(debugCalls.some((message) => message.includes('left to Prettier'))).toBe(true);

    delete process.env.DEBUG;
  });
});
