import { describe, expect, it } from 'vitest';

import { SITEMAP } from '../sitemap.js';

describe('constants/sitemap', () => {
  it('has default values', () => {
    expect(SITEMAP.DEFAULTS.OUTPUT_DIR).toBe('./public');
    expect(SITEMAP.DEFAULTS.EXCLUDE_PATHS).toContain('/404');
    expect(SITEMAP.DEFAULTS.EXCLUDE_PATHS).toContain('/500');
  });

  it('has robots.txt configuration', () => {
    expect(SITEMAP.ROBOTS_TXT.USER_AGENT).toBe('*');
    expect(SITEMAP.ROBOTS_TXT.ALLOW).toBe('/');
  });

  it('has priority and change frequency', () => {
    expect(SITEMAP.DEFAULTS.PRIORITY).toBe(0.7);
    expect(SITEMAP.DEFAULTS.CHANGE_FREQUENCY).toBe('weekly');
  });
});
