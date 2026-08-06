import { describe, it, expect } from 'vitest';

import { stripParser } from '../parser.js';

describe('stripParser', () => {
  it('should remove parser from languageOptions', () => {
    const flatConfigs = [{ languageOptions: { parser: 'typescript-parser', sourceType: 'module' } }];

    const result = stripParser(flatConfigs);

    expect(result[0].languageOptions).toEqual({ sourceType: 'module' });
    expect(result[0].languageOptions.parser).toBeUndefined();
  });

  it('should remove languageOptions if only parser present', () => {
    const flatConfigs = [{ languageOptions: { parser: 'typescript-parser' } }];

    const result = stripParser(flatConfigs);

    expect(result[0].languageOptions).toBeUndefined();
  });

  it('should skip configs without parser', () => {
    const flatConfigs = [{ languageOptions: { sourceType: 'module' } }];

    const result = stripParser(flatConfigs);

    expect(result[0]).toEqual({ languageOptions: { sourceType: 'module' } });
  });

  it('should skip configs without languageOptions', () => {
    const flatConfigs = [{ rules: { 'rule-1': 'error' } }];

    const result = stripParser(flatConfigs);

    expect(result[0]).toEqual({ rules: { 'rule-1': 'error' } });
  });

  it('should not mutate original configs', () => {
    const flatConfigs = [{ languageOptions: { parser: 'typescript-parser', sourceType: 'module' } }];

    const original = JSON.parse(JSON.stringify(flatConfigs));
    stripParser(flatConfigs);

    expect(flatConfigs).toEqual(original);
  });

  it('should handle multiple configs with different states', () => {
    const flatConfigs = [
      { languageOptions: { parser: 'typescript-parser' } },
      { languageOptions: { sourceType: 'module' } },
      { rules: { 'rule-1': 'error' } },
    ];

    const result = stripParser(flatConfigs);

    expect(result[0].languageOptions).toBeUndefined();
    expect(result[1].languageOptions).toEqual({ sourceType: 'module' });
    expect(result[2]).toEqual({ rules: { 'rule-1': 'error' } });
  });

  it('should handle multiple languageOptions properties', () => {
    const flatConfigs = [
      {
        languageOptions: {
          parser: 'typescript-parser',
          sourceType: 'module',
          ecmaVersion: 2021,
          globals: { global: true },
        },
      },
    ];

    const result = stripParser(flatConfigs);

    expect(result[0].languageOptions).toEqual({ sourceType: 'module', ecmaVersion: 2021, globals: { global: true } });
  });
});
