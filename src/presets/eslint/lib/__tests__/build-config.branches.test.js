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
    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });

    expect(Array.isArray(result)).toBe(true);
    expect(result.at(-1).files).toContain('**/*.js');
  });

  it('merges user globalIgnores with defaults', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');
    const result = buildConfigModule.buildConfig({
      files: ['**/*.js'],
      options: { globalIgnores: ['**/.cache-custom/'] },
    });

    const ignoreConfig = result.find((cfg) => Array.isArray(cfg.ignores));
    expect(ignoreConfig.ignores).toContain('**/.cache-custom/');
    expect(ignoreConfig.ignores).toContain('**/node_modules/');
  });

  it('leaves ignores off the main object when none provided', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');
    const result = buildConfigModule.buildConfig({ files: ['**/*.js'] });

    expect(result.at(-1).ignores).toBeUndefined();
  });

  it('spreads provided ignores onto the main object', async () => {
    // Import after the mock is in place.
    const buildConfigModule = await import('../build-config.js');
    const result = buildConfigModule.buildConfig({ files: ['**/*.js'], options: { ignores: ['**/generated/'] } });

    expect(result.at(-1).ignores).toEqual(['**/generated/']);
  });
});
