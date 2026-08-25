/**
 * Tests the recipe's empty-config fallback by mocking the plugin loader to
 * return null for both plugins. Lives in its own file because `vi.mock` is
 * hoisted and applies to the entire test module.
 */

import path from 'node:path';

import { describe, expect, it, vi } from 'vitest';

vi.mock('../tailwind-plugins.js', () => ({ loadTailwindPlugins: async () => ({ better: null, core: null }) }));

const { tailwind } = await import('../tailwind.js');

describe('eslint/recipes/tailwind with no plugins installed', () => {
  it('returns an empty config fragment when neither plugin is installed', async () => {
    const config = await tailwind({ cwd: path.join(path.sep, 'unused') });

    expect(config.plugins).toEqual({});
    expect(config.settings).toEqual({});
    expect(config.rules).toEqual({});
  });
});
