import { describe, expect, it } from 'vitest';

import { STYLELINT } from '../stylelint.js';

describe('constants/stylelint', () => {
  it('has default configuration', () => {
    expect(STYLELINT.DEFAULTS.extends).toBeDefined();
    expect(STYLELINT.DEFAULTS.extends.length).toBeGreaterThan(0);
  });

  it('has plugins defined', () => {
    expect(STYLELINT.PLUGINS.ORDER).toBe('stylelint-order');
  });

  it('does not carry an unused customSyntax config', () => {
    expect(STYLELINT.CONFIG).toBeUndefined();
  });
});
