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

describe('eslint/lib/rules.js with missing optional plugins', () => {
  const debugCalls = [];
  let rules;

  it('registers no central plugins, emits no rules, and logs install hints', async () => {
    // Enable debug logging before the module is evaluated so each missing
    // plugin emits its install hint.
    process.env.DEBUG = 'eslint';
    vi.spyOn(console, 'debug').mockImplementation((...args) => debugCalls.push(args.join(' ')));

    // Import after mocks and DEBUG are in place so top-level awaits hit the
    // catch branches.
    rules = await import('../rules.js');

    // Verify that no Tailwind plugins are registered when both are missing.
    expect(rules.getTailwindCentralPlugins()).toEqual({});

    // Verify that no Tailwind rules are emitted without better-tailwindcss.
    expect(rules.tailwindRules()).toEqual({});

    // Verify that install hints are logged for both missing plugins.
    expect(debugCalls.some((message) => message.includes('eslint-plugin-better-tailwindcss'))).toBe(true);
    expect(debugCalls.some((message) => message.includes('eslint-plugin-tailwindcss'))).toBe(true);

    delete process.env.DEBUG;
  });

  it('resolves settings from the first candidate entry point', async () => {
    // Reuse the module loaded with plugins absent; entry point probing is
    // unaffected by their absence.
    rules ??= await import('../rules.js');

    // Verify that settings point at the first probed candidate path.
    expect(rules.tailwindSettings()).toEqual({
      tailwindcss: { cssConfigPath: 'src/app/globals.css' },
      'better-tailwindcss': { entryPoint: 'src/app/globals.css' },
    });
  });

  it('skips debug logging when DEBUG is unset', async () => {
    // Drop DEBUG so both logging conditions evaluate to false.
    delete process.env.DEBUG;
    vi.resetModules();
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    debugSpy.mockClear();

    // Re-import so top-level catch branches run again under this env.
    await import('../rules.js');

    // Verify that no install hints are logged without DEBUG.
    expect(debugSpy).not.toHaveBeenCalled();
  });

  it('logs install hints under wildcard DEBUG', async () => {
    // Wildcard DEBUG skips the substring check and enables logging.
    process.env.DEBUG = '*';
    vi.resetModules();
    const debugCalls = [];
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation((...args) => debugCalls.push(args.join(' ')));
    debugSpy.mockClear();

    // Re-import so top-level catch branches run again under this env.
    await import('../rules.js');

    // Verify that install hints are logged for both missing plugins.
    expect(debugCalls.some((message) => message.includes('eslint-plugin-better-tailwindcss'))).toBe(true);
    expect(debugCalls.some((message) => message.includes('eslint-plugin-tailwindcss'))).toBe(true);
  });
});
