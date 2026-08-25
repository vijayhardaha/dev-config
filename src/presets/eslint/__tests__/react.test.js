import { describe, it, expect } from 'vitest';

describe('eslint/react.js', () => {
  it('should export createConfig function', async () => {
    const module = await import('../react.js');

    expect(typeof module.createConfig).toBe('function');
  });

  it('should export default config', async () => {
    const module = await import('../react.js');

    expect(module.default).toBeDefined();
  });

  it('should include additional file patterns from options', async () => {
    const module = await import('../react.js');
    const result = module.createConfig({ files: ['custom/**/*.tsx'] });
    const configObject = result.at(-1);

    expect(configObject.files).toContain('custom/**/*.tsx');
  });

  it('should omit Tailwind plugins and rules by default', async () => {
    const module = await import('../react.js');
    const result = module.createConfig();
    const configObject = result.at(-1);

    expect(configObject.plugins['better-tailwindcss']).toBeUndefined();
    expect(configObject.plugins.tailwindcss).toBeUndefined();

    expect(Object.keys(configObject.rules).filter((rule) => rule.startsWith('better-tailwindcss/'))).toHaveLength(0);
    expect(Object.keys(configObject.rules).filter((rule) => rule.startsWith('tailwindcss/'))).toHaveLength(0);
  });

  it('should register Tailwind plugins when tailwind option is true', async () => {
    const module = await import('../react.js');
    const result = module.createConfig({ tailwind: true });
    const configObject = result.at(-1);

    expect(configObject.plugins['better-tailwindcss']).toBeDefined();
    expect(configObject.plugins.tailwindcss).toBeDefined();

    expect(configObject.rules['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
    expect(configObject.rules['tailwindcss/no-unnecessary-arbitrary-value']).toBe('warn');
  });
});
