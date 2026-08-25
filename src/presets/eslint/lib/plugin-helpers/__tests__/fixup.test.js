import { describe, it, expect, vi } from 'vitest';

import { fixupPlugins } from '../fixup.js';

vi.mock('@eslint/compat', () => ({ fixupPluginRules: (plugin) => ({ ...plugin, _fixed: true }) }));

describe('fixupPlugins', () => {
  it('should wrap plugin rules with fixupPluginRules', () => {
    const flatConfigs = [{ plugins: { 'test-plugin': { name: 'test' } } }];

    const result = fixupPlugins(flatConfigs);

    expect(result[0].plugins['test-plugin']._fixed).toBe(true);
  });

  it('should handle multiple plugins', () => {
    const flatConfigs = [{ plugins: { 'plugin-1': { name: 'one' }, 'plugin-2': { name: 'two' } } }];

    const result = fixupPlugins(flatConfigs);

    expect(result[0].plugins['plugin-1']._fixed).toBe(true);
    expect(result[0].plugins['plugin-2']._fixed).toBe(true);
  });

  it('should skip configs without plugins', () => {
    const flatConfigs = [{ rules: { 'rule-1': 'error' } }, { plugins: { 'test-plugin': { name: 'test' } } }];

    const result = fixupPlugins(flatConfigs);

    expect(result[0]).toEqual({ rules: { 'rule-1': 'error' } });
    expect(result[1].plugins['test-plugin']._fixed).toBe(true);
  });

  it('should not mutate original configs', () => {
    const flatConfigs = [{ plugins: { 'test-plugin': { name: 'test' } } }];

    const original = JSON.parse(JSON.stringify(flatConfigs));
    fixupPlugins(flatConfigs);

    expect(flatConfigs).toEqual(original);
  });

  it('should handle empty configs array', () => {
    const result = fixupPlugins([]);
    expect(result).toEqual([]);
  });
});
