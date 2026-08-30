/**
 * Tests the recipe against partial plugin installs (exactly one of the two
 * Tailwind plugins present). Rules must only reference plugins that actually
 * loaded, or ESLint fails config validation. Lives in its own file because
 * `vi.mock` is hoisted and applies to the entire test module.
 */

import path from 'node:path';

import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLoadTailwindPlugins = vi.hoisted(() => vi.fn());

vi.mock('../tailwind-plugins.js', () => ({ loadTailwindPlugins: mockLoadTailwindPlugins }));

const { tailwind } = await import('../tailwind.js');

const betterPlugin = { rules: {} };
const corePlugin = { rules: {} };

describe('eslint/recipes/tailwind with a partial plugin install', () => {
  beforeEach(() => {
    mockLoadTailwindPlugins.mockReset();
  });

  it('omits better-tailwindcss rules when tailwindcss is installed but better-tailwindcss is missing', async () => {
    mockLoadTailwindPlugins.mockResolvedValue({ better: null, core: corePlugin });

    const config = await tailwind({ entryPoint: 'src/app/globals.css', cwd: path.join(path.sep, 'unused') });

    expect(config.plugins).toEqual({ tailwindcss: corePlugin });
    expect(Object.keys(config.rules).filter((rule) => rule.startsWith('better-tailwindcss/'))).toEqual([]);
    expect(config.rules['tailwindcss/no-unnecessary-arbitrary-value']).toBe('warn');
  });

  it('omits tailwindcss rules when only eslint-plugin-better-tailwindcss is installed', async () => {
    mockLoadTailwindPlugins.mockResolvedValue({ better: betterPlugin, core: null });

    const config = await tailwind({ entryPoint: 'src/app/globals.css', cwd: path.join(path.sep, 'unused') });

    expect(config.plugins).toEqual({ 'better-tailwindcss': betterPlugin });
    expect(config.rules['better-tailwindcss/enforce-canonical-classes']).toBe('warn');
    expect(config.rules['better-tailwindcss/no-unnecessary-whitespace']).toBe('warn');
    expect(config.rules['better-tailwindcss/enforce-consistent-class-order']).toBe('warn');
    expect(config.rules['better-tailwindcss/enforce-consistent-line-wrapping']).toEqual(['warn', { printWidth: 120 }]);
    expect(Object.keys(config.rules).filter((rule) => rule.startsWith('tailwindcss/'))).toEqual([]);
  });
});
