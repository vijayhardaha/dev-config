import { describe, expect, it, vi } from 'vitest';

// Hide the project .gitignore from the builder so the absent-gitignore
// fallback branches execute during config assembly.
vi.mock('node:fs', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, existsSync: (path) => (String(path).endsWith('.gitignore') ? false : actual.existsSync(path)) };
});

describe('eslint/lib/build-config.js branch paths', () => {
  it('omits gitignore config when .gitignore is absent', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');

    // Build a config without extra inputs.
    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });

    // Verify that the config array still ends with the main object.
    expect(Array.isArray(result)).toBe(true);
    expect(result.at(-1).files).toContain('**/*.js');
  });

  it('merges user globalIgnores with defaults', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');

    // Build a config with user-provided global ignore patterns.
    const result = buildConfigModule.buildConfig({
      files: ['**/*.js'],
      options: { globalIgnores: ['**/.cache-custom/'] },
    });

    // Verify that the user pattern lands alongside the defaults.
    const ignoreConfig = result.find((cfg) => Array.isArray(cfg.ignores));
    expect(ignoreConfig.ignores).toContain('**/.cache-custom/');
    expect(ignoreConfig.ignores).toContain('**/node_modules/');
  });

  it('leaves ignores off the main object when none provided', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');

    // Build a config without ignore overrides.
    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });

    // Verify that the main object carries no ignores property.
    expect(result.at(-1).ignores).toBeUndefined();
  });

  it('spreads provided ignores onto the main object', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');

    // Build a config with user-provided ignore patterns on the main object.
    const result = buildConfigModule.buildConfig({ files: ['**/*.js'], options: { ignores: ['**/generated/'] } });

    // Verify that only the provided patterns land on the main object.
    expect(result.at(-1).ignores).toEqual(['**/generated/']);
  });
});
