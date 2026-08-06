import { describe, it, expect } from 'vitest';

import { stripPlugins } from '../strip.js';

describe('stripPlugins', () => {
  it('should remove specified plugins', () => {
    const flatConfigs = [{ plugins: { prettier: { name: 'prettier' }, eslint: { name: 'eslint' } } }];

    const result = stripPlugins(flatConfigs, ['prettier']);

    expect(result[0].plugins).toEqual({ eslint: { name: 'eslint' } });
  });

  it('should remove multiple plugins', () => {
    const flatConfigs = [
      { plugins: { prettier: { name: 'prettier' }, eslint: { name: 'eslint' }, jsdoc: { name: 'jsdoc' } } },
    ];

    const result = stripPlugins(flatConfigs, ['prettier', 'eslint']);

    expect(result[0].plugins).toEqual({ jsdoc: { name: 'jsdoc' } });
  });

  it('should remove plugins object if all plugins are stripped', () => {
    const flatConfigs = [{ plugins: { prettier: { name: 'prettier' } }, rules: { 'rule-1': 'error' } }];

    const result = stripPlugins(flatConfigs, ['prettier']);

    expect(result[0].plugins).toBeUndefined();
    expect(result[0].rules).toEqual({ 'rule-1': 'error' });
  });

  it('should return same array if no plugins to strip', () => {
    const flatConfigs = [{ plugins: { prettier: { name: 'prettier' } } }];

    const result = stripPlugins(flatConfigs, []);

    expect(result).toBe(flatConfigs);
  });

  it('should skip configs without plugins', () => {
    const flatConfigs = [{ rules: { 'rule-1': 'error' } }, { plugins: { prettier: { name: 'prettier' } } }];

    const result = stripPlugins(flatConfigs, ['prettier']);

    expect(result[0]).toEqual({ rules: { 'rule-1': 'error' } });
    expect(result[1].plugins).toBeUndefined();
  });

  it('should not mutate original configs', () => {
    const flatConfigs = [{ plugins: { prettier: { name: 'prettier' }, eslint: { name: 'eslint' } } }];

    const original = JSON.parse(JSON.stringify(flatConfigs));
    stripPlugins(flatConfigs, ['prettier']);

    expect(flatConfigs).toEqual(original);
  });

  it('should handle multiple configs', () => {
    const flatConfigs = [
      { plugins: { prettier: { name: 'prettier' } } },
      { plugins: { prettier: { name: 'prettier' }, eslint: { name: 'eslint' } } },
    ];

    const result = stripPlugins(flatConfigs, ['prettier']);

    expect(result[0].plugins).toBeUndefined();
    expect(result[1].plugins).toEqual({ eslint: { name: 'eslint' } });
  });
});
