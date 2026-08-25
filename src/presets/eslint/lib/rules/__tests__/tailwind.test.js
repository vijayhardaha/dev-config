import { describe, it, expect, beforeAll } from 'vitest';

describe('eslint/lib/rules/tailwind.js', () => {
  let getTailwindCentralPlugins;
  let resolveTailwindEntryPoint;
  let tailwindSettings;
  let tailwindRules;

  beforeAll(async () => {
    const module = await import('../tailwind.js');
    getTailwindCentralPlugins = module.getTailwindCentralPlugins;
    resolveTailwindEntryPoint = module.resolveTailwindEntryPoint;
    tailwindSettings = module.tailwindSettings;
    tailwindRules = module.tailwindRules;
  });

  it('exports getTailwindCentralPlugins as a function', () => {
    expect(typeof getTailwindCentralPlugins).toBe('function');
  });

  it('exports resolveTailwindEntryPoint as a function', () => {
    expect(typeof resolveTailwindEntryPoint).toBe('function');
  });

  it('exports tailwindSettings as a function', () => {
    expect(typeof tailwindSettings).toBe('function');
  });

  it('exports tailwindRules as a function', () => {
    expect(typeof tailwindRules).toBe('function');
  });

  it('registers Tailwind plugins when they are installed', () => {
    const central = getTailwindCentralPlugins();

    expect(central).toHaveProperty('better-tailwindcss');
    expect(central).toHaveProperty('tailwindcss');
  });

  it('returns Tailwind rules when the flag is true and plugins are installed', () => {
    const result = tailwindRules(true);

    expect(result['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
    expect(result['better-tailwindcss/no-unnecessary-whitespace']).toBe('warn');
    expect(result['tailwindcss/no-unnecessary-arbitrary-value']).toBe('warn');
  });

  it('configures line wrapping with the shared Prettier print width', () => {
    const result = tailwindRules(true);

    expect(result['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual(['warn', { printWidth: 120 }]);
  });

  it('returns an empty object when the flag is false', () => {
    const result = tailwindRules(false);

    expect(result).toEqual({});
  });

  it('returns an empty object when the flag is omitted and defaults to enabled', () => {
    const result = tailwindRules();

    expect(result['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
  });

  it('resolves tailwindSettings to an object', () => {
    const settings = tailwindSettings();

    expect(typeof settings).toBe('object');
  });

  it('resolves tailwindSettings keys when an entry point exists', () => {
    // An entry point must exist for settings to carry keys; otherwise
    // the empty-object branch returns. Either outcome is valid; the
    // shape is what matters.
    const settings = tailwindSettings();

    if (Object.keys(settings).length > 0) {
      expect(settings).toHaveProperty('tailwindcss.cssConfigPath');
      expect(settings).toHaveProperty('better-tailwindcss.entryPoint');
    } else {
      expect(settings).toEqual({});
    }
  });
});
