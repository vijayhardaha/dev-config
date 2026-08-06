import { describe, it, expect } from 'vitest';

import { getEnabledPlugins } from '../enabled-plugins.js';

describe('getEnabledPlugins', () => {
  it('should filter plugins by enabled options', () => {
    const conditionalPlugins = { typescript: { name: 'typescript' }, react: { name: 'react' }, a11y: { name: 'a11y' } };

    const options = { typescript: true, react: false, a11y: true };
    const result = getEnabledPlugins(conditionalPlugins, options);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual({ name: 'typescript' });
    expect(result).toContainEqual({ name: 'a11y' });
  });

  it('should handle array values', () => {
    const conditionalPlugins = { react: [{ name: 'react' }, { name: 'react-hooks' }] };

    const options = { react: true };
    const result = getEnabledPlugins(conditionalPlugins, options);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ name: 'react' });
    expect(result[1]).toEqual({ name: 'react-hooks' });
  });

  it('should return empty array when no options enabled', () => {
    const conditionalPlugins = { typescript: { name: 'typescript' }, react: { name: 'react' } };

    const options = { typescript: false, react: false };
    const result = getEnabledPlugins(conditionalPlugins, options);

    expect(result).toEqual([]);
  });

  it('should handle mixed single and array values', () => {
    const conditionalPlugins = {
      typescript: { name: 'typescript' },
      react: [{ name: 'react' }, { name: 'react-hooks' }],
      a11y: { name: 'a11y' },
    };

    const options = { typescript: true, react: true, a11y: false };
    const result = getEnabledPlugins(conditionalPlugins, options);

    expect(result).toHaveLength(3);
  });
});
