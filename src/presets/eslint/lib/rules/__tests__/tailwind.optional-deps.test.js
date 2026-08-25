import { describe, expect, it, vi } from 'vitest';

// Simulate both Tailwind plugins being absent so the lazy import catch
// branches and their debug logging execute during module evaluation.
vi.mock('eslint-plugin-better-tailwindcss', () => {
  throw new Error('simulated missing dependency');
});

vi.mock('eslint-plugin-tailwindcss', () => {
  throw new Error('simulated missing dependency');
});

// Report every probed entry point as existing so tailwindSettings takes the
// found-entry-point branch without touching the filesystem.
vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, existsSync: () => true };
});

describe('eslint/lib/rules/tailwind.js with missing optional plugins', () => {
  const debugCalls = [];
  let rules;

  it('registers no central plugins, emits no rules, and logs install hints', async () => {
    process.env.DEBUG = 'eslint';
    vi.spyOn(console, 'debug').mockImplementation((...args) => debugCalls.push(args.join(' ')));

    // Import after mocks and DEBUG are in place so top-level awaits hit the
    // catch branches.
    rules = await import('../tailwind.js');

    expect(rules.getTailwindCentralPlugins()).toEqual({});
    expect(rules.tailwindRules()).toEqual({});

    expect(debugCalls.some((message) => message.includes('eslint-plugin-better-tailwindcss'))).toBe(true);
    expect(debugCalls.some((message) => message.includes('eslint-plugin-tailwindcss'))).toBe(true);

    delete process.env.DEBUG;
  });

  it('resolves settings from the first candidate entry point', async () => {
    // Reuse the module loaded with plugins absent; entry point probing is
    // unaffected by their absence.
    rules ??= await import('../tailwind.js');

    expect(rules.tailwindSettings()).toEqual({
      tailwindcss: { cssConfigPath: 'src/app/globals.css' },
      'better-tailwindcss': { entryPoint: 'src/app/globals.css' },
    });
  });

  it('skips debug logging when DEBUG is unset', async () => {
    delete process.env.DEBUG;
    vi.resetModules();
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    debugSpy.mockClear();

    // Re-import so top-level catch branches run again under this env.
    await import('../tailwind.js');

    expect(debugSpy).not.toHaveBeenCalled();
  });

  it('logs install hints under wildcard DEBUG', async () => {
    process.env.DEBUG = '*';
    vi.resetModules();
    const debugCalls = [];
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation((...args) => debugCalls.push(args.join(' ')));
    debugSpy.mockClear();

    // Re-import so top-level catch branches run again under this env.
    await import('../tailwind.js');

    expect(debugCalls.some((message) => message.includes('eslint-plugin-better-tailwindcss'))).toBe(true);
    expect(debugCalls.some((message) => message.includes('eslint-plugin-tailwindcss'))).toBe(true);
  });
});
