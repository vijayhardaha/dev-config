import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

// Shared handle to stub prettier.resolveConfig before modules evaluate.
const mockResolveConfig = vi.hoisted(() => vi.fn());

// Intercept prettier so the recipe can probe the consumer's config without
// touching real files on disk.
vi.mock('prettier', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, resolveConfig: mockResolveConfig };
});

/**
 * Creates a temporary fixture project with a Tailwind entry stylesheet at the
 * given relative path. Returns the absolute project root.
 *
 * @param {string} [entryRelPath] - Path of the Tailwind entry stylesheet, relative to the project root.
 *
 * @returns {string} Absolute path of the created project root.
 */
const makeProject = (entryRelPath = 'src/app/globals.css') => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-config-recipe-tailwind-'));
  const entryAbs = path.join(root, entryRelPath);
  fs.mkdirSync(path.dirname(entryAbs), { recursive: true });
  fs.writeFileSync(entryAbs, '@import "tailwindcss";\n');

  return root;
};

const cleanup = (root) => fs.rmSync(root, { recursive: true, force: true });

describe('eslint/recipes/tailwind', () => {
  describe('with plugins installed', () => {
    let projectDir;

    beforeAll(() => {
      projectDir = makeProject('src/app/globals.css');
    });

    afterAll(() => {
      cleanup(projectDir);
    });

    it('auto-probes the Tailwind entry stylesheet when entryPoint is omitted', async () => {
      mockResolveConfig.mockResolvedValueOnce({});
      const { tailwind } = await import('../tailwind.js');

      const config = await tailwind({ cwd: projectDir });

      expect(config.settings.tailwindcss.cssConfigPath).toBe('src/app/globals.css');
      expect(config.settings['better-tailwindcss'].entryPoint).toBe('src/app/globals.css');
    });

    it('honors an explicit entryPoint override', async () => {
      mockResolveConfig.mockResolvedValueOnce({});
      const { tailwind } = await import('../tailwind.js');

      const config = await tailwind({ entryPoint: 'custom/tw.css', cwd: projectDir });

      expect(config.settings.tailwindcss.cssConfigPath).toBe('custom/tw.css');
      expect(config.settings['better-tailwindcss'].entryPoint).toBe('custom/tw.css');
    });

    it('registers both Tailwind ESLint plugins', async () => {
      mockResolveConfig.mockResolvedValueOnce({});
      const { tailwind } = await import('../tailwind.js');

      const config = await tailwind({ cwd: projectDir });

      expect(config.plugins['better-tailwindcss']).toBeDefined();
      expect(config.plugins.tailwindcss).toBeDefined();
    });

    it('omits ordering and wrapping rules when prettier-plugin-tailwindcss is active', async () => {
      mockResolveConfig.mockResolvedValueOnce({ plugins: ['prettier-plugin-tailwindcss'] });
      const { tailwind } = await import('../tailwind.js');

      const config = await tailwind({ cwd: projectDir });

      // Formatter-owned concerns are left to Prettier.
      expect(config.rules['better-tailwindcss/enforce-consistent-class-order']).toBeUndefined();
      expect(config.rules['better-tailwindcss/enforce-consistent-line-wrapping']).toBeUndefined();

      // Lint-only concerns stay enabled.
      expect(config.rules['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
      expect(config.rules['better-tailwindcss/no-unnecessary-whitespace']).toBe('warn');
      expect(config.rules['tailwindcss/no-unnecessary-arbitrary-value']).toBe('warn');
    });

    it('keeps ordering and wrapping rules without the prettier plugin', async () => {
      mockResolveConfig.mockResolvedValueOnce({});
      const { tailwind } = await import('../tailwind.js');

      const config = await tailwind({ cwd: projectDir });

      expect(config.rules['better-tailwindcss/enforce-consistent-class-order']).toBe('warn');
      expect(config.rules['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual([
        'warn',
        { printWidth: 120 },
      ]);
    });

    it('falls back to full rules when prettier.resolveConfig rejects', async () => {
      mockResolveConfig.mockRejectedValueOnce(new Error('simulated resolution failure'));
      const { tailwind } = await import('../tailwind.js');

      const config = await tailwind({ cwd: projectDir });

      expect(config.rules['better-tailwindcss/enforce-consistent-class-order']).toBe('warn');
      expect(config.rules['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual([
        'warn',
        { printWidth: 120 },
      ]);
    });

    it('logs an interop notice under DEBUG when the prettier plugin is active', async () => {
      process.env.DEBUG = 'eslint';
      mockResolveConfig.mockResolvedValueOnce({ plugins: ['prettier-plugin-tailwindcss'] });
      const { tailwind } = await import('../tailwind.js');
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      debugSpy.mockClear();

      await tailwind({ cwd: projectDir });

      const calls = debugSpy.mock.calls.flat().map(String);
      expect(calls.some((message) => message.includes('left to Prettier'))).toBe(true);

      debugSpy.mockRestore();
      delete process.env.DEBUG;
    });

    it('logs an interop notice under DEBUG "*" when the prettier plugin is active', async () => {
      process.env.DEBUG = '*';
      mockResolveConfig.mockResolvedValueOnce({ plugins: ['prettier-plugin-tailwindcss'] });
      const { tailwind } = await import('../tailwind.js');
      const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
      debugSpy.mockClear();

      await tailwind({ cwd: projectDir });

      const calls = debugSpy.mock.calls.flat().map(String);
      expect(calls.some((message) => message.includes('left to Prettier'))).toBe(true);

      debugSpy.mockRestore();
      delete process.env.DEBUG;
    });

    it('returns empty settings when no Tailwind entry stylesheet exists', async () => {
      mockResolveConfig.mockResolvedValueOnce({});
      const emptyProject = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-config-recipe-tailwind-empty-'));
      const { tailwind } = await import('../tailwind.js');

      try {
        const config = await tailwind({ cwd: emptyProject });

        expect(config.settings).toEqual({});
      } finally {
        fs.rmSync(emptyProject, { recursive: true, force: true });
      }
    });
  });
});
