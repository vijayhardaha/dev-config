import { describe, it, expect } from 'vitest';

import { flattenPlugins } from '../flatten.js';

describe('flattenPlugins', () => {
  it('should flatten mixed arrays and objects', () => {
    const plugins = [
      { rules: { 'rule-1': 'error' } },
      [{ rules: { 'rule-2': 'error' } }],
      { rules: { 'rule-3': 'error' } },
    ];

    const result = flattenPlugins(plugins);

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ rules: { 'rule-1': 'error' } });
    expect(result[1]).toEqual({ rules: { 'rule-2': 'error' } });
    expect(result[2]).toEqual({ rules: { 'rule-3': 'error' } });
  });

  it('should handle nested arrays', () => {
    const plugins = [[{ config: 'a' }, { config: 'b' }], [{ config: 'c' }]];

    const result = flattenPlugins(plugins);

    expect(result).toHaveLength(3);
  });

  it('should return empty array for empty input', () => {
    const result = flattenPlugins([]);
    expect(result).toEqual([]);
  });

  it('should filter out null and undefined values', () => {
    const plugins = [{ config: 'a' }, null, { config: 'b' }, undefined];

    const result = flattenPlugins(plugins);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ config: 'a' });
    expect(result).toContainEqual({ config: 'b' });
  });

  it('should handle boolean and false values', () => {
    const plugins = [{ config: 'a' }, false, { config: 'b' }];

    const result = flattenPlugins(plugins);

    expect(result).toHaveLength(2);
  });
});
