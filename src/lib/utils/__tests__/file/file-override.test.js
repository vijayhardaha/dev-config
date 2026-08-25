import { describe, expect, it } from 'vitest';

import { createFileOverride } from '../../file/file-override.js';

describe('utils/file/createFileOverride', () => {
  it('builds an override with the given files and options', () => {
    expect(createFileOverride(['*.py'], { tabWidth: 4 })).toEqual({ files: ['*.py'], options: { tabWidth: 4 } });
  });

  it('passes through empty files and options', () => {
    expect(createFileOverride([], {})).toEqual({ files: [], options: {} });
  });
});
