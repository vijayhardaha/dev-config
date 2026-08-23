import { describe, it, expect } from 'vitest';

// Test suite for the ESLint Next.js configuration module.
describe('eslint/next.js', () => {
  // Test that the module exports the createConfig function.
  it('should export createConfig function', async () => {
    // Dynamically import the next.js module to test its exports.
    const module = await import('../next.js');

    // Verify that createConfig is a function (used to create ESLint config for Next.js).
    expect(typeof module.createConfig).toBe('function');
  });

  // Test that the module exports a default configuration object.
  it('should export default config', async () => {
    // Dynamically import the next.js module to test its exports.
    const module = await import('../next.js');

    // Verify that the default export is defined (should be an ESLint config object).
    expect(module.default).toBeDefined();
  });

  // Test that additional file patterns are applied to the generated config.
  it('should include additional file patterns from options', async () => {
    const module = await import('../next.js');
    const result = module.createConfig({ files: ['custom/**/*.tsx'] });
    const configObject = result.at(-1);

    expect(configObject.files).toContain('custom/**/*.tsx');
  });

  // Test that Tailwind plugins are registered on the main config by default.
  it('should register Tailwind plugins by default', async () => {
    const module = await import('../next.js');
    const result = module.createConfig();
    const configObject = result.at(-1);

    // Verify that the better-tailwindcss plugin is centrally registered.
    expect(configObject.plugins['better-tailwindcss']).toBeDefined();

    // Verify that the tailwindcss plugin is centrally registered.
    expect(configObject.plugins.tailwindcss).toBeDefined();

    // Verify that the Tailwind canonicalization rule is enabled.
    expect(configObject.rules['better-tailwindcss/enforce-canonical-classes']).toBe('warn');

    // Verify that the arbitrary value replacement rule is enabled.
    expect(configObject.rules['tailwindcss/no-unnecessary-arbitrary-value']).toBe('warn');
  });

  // Test that Tailwind plugins, rules, and settings are omitted when disabled.
  it('should omit Tailwind plugins and rules when tailwind option is false', async () => {
    const module = await import('../next.js');
    const result = module.createConfig({ tailwind: false });
    const configObject = result.at(-1);

    // Verify that no Tailwind plugins are centrally registered.
    expect(configObject.plugins['better-tailwindcss']).toBeUndefined();
    expect(configObject.plugins.tailwindcss).toBeUndefined();

    // Verify that no Tailwind rules are present in the config.
    expect(Object.keys(configObject.rules).filter((rule) => rule.startsWith('better-tailwindcss/'))).toHaveLength(0);
    expect(Object.keys(configObject.rules).filter((rule) => rule.startsWith('tailwindcss/'))).toHaveLength(0);

    // Verify that no Tailwind settings are present in the config.
    expect(configObject.settings.tailwindcss).toBeUndefined();
    expect(configObject.settings['better-tailwindcss']).toBeUndefined();
  });

  // Test that user settings override the generated Tailwind settings.
  it('should let user settings override Tailwind settings', async () => {
    const module = await import('../next.js');
    const result = module.createConfig({
      settings: {
        'better-tailwindcss': { entryPoint: 'styles/site.css' },
        tailwindcss: { cssConfigPath: 'styles/site.css' },
      },
    });
    const configObject = result.at(-1);

    // Verify that the user entry point wins over the auto-detected one.
    expect(configObject.settings['better-tailwindcss'].entryPoint).toBe('styles/site.css');
    expect(configObject.settings.tailwindcss.cssConfigPath).toBe('styles/site.css');
  });
});
