import { describe, it, expect } from 'vitest';

import { ESLINT, PRETTIER, SITEMAP, COMMITLINT, STYLELINT, TYPESCRIPT, JSCONFIG, HUSKY } from '../config-constants.js';

describe('Config Constants', () => {
  describe('ESLINT', () => {
    it('should have file patterns for all JavaScript file types', () => {
      expect(ESLINT.FILES.JAVASCRIPT).toContain('**/*.{js,mjs,cjs}');
      expect(ESLINT.FILES.TYPESCRIPT).toContain('**/*.{ts,mts,cts}');
      expect(ESLINT.FILES.JSX).toContain('**/*.{jsx,tsx}');
    });

    it('should have FILE_PATTERNS with and without TypeScript', () => {
      expect(ESLINT.FILE_PATTERNS.withTs).toBeDefined();
      expect(ESLINT.FILE_PATTERNS.withoutTs).toBeDefined();
      expect(Array.isArray(ESLINT.FILE_PATTERNS.withTs)).toBe(true);
    });
  });

  describe('PRETTIER', () => {
    it('should have base formatting settings', () => {
      expect(PRETTIER.BASE.printWidth).toBe(120);
      expect(PRETTIER.BASE.tabWidth).toBe(2);
      expect(PRETTIER.BASE.semi).toBe(true);
      expect(PRETTIER.BASE.singleQuote).toBe(false);
    });

    it('should have indentation settings', () => {
      expect(PRETTIER.INDENTATION.BACKEND).toBe(4);
      expect(PRETTIER.INDENTATION.FRONTEND).toBe(2);
    });

    it('should have file patterns for overrides', () => {
      expect(PRETTIER.FILE_PATTERNS.BACKEND).toBeDefined();
      expect(PRETTIER.FILE_PATTERNS.JAVASCRIPT).toBeDefined();
      expect(PRETTIER.FILE_PATTERNS.STYLESHEETS).toBeDefined();
    });

    it('should have override options', () => {
      expect(PRETTIER.OVERRIDES.BACKEND.tabWidth).toBe(4);
      expect(PRETTIER.OVERRIDES.JAVASCRIPT.singleQuote).toBe(true);
    });
  });

  describe('SITEMAP', () => {
    it('should have default values', () => {
      expect(SITEMAP.DEFAULTS.SITE_URL).toBe('https://example.com');
      expect(SITEMAP.DEFAULTS.OUTPUT_DIR).toBe('./public');
      expect(SITEMAP.DEFAULTS.EXCLUDE_PATHS).toContain('/404');
      expect(SITEMAP.DEFAULTS.EXCLUDE_PATHS).toContain('/500');
    });

    it('should have robots.txt configuration', () => {
      expect(SITEMAP.ROBOTS_TXT.USER_AGENT).toBe('*');
      expect(SITEMAP.ROBOTS_TXT.ALLOW).toBe('/');
    });

    it('should have priority and change frequency', () => {
      expect(SITEMAP.DEFAULTS.PRIORITY).toBe(0.7);
      expect(SITEMAP.DEFAULTS.CHANGE_FREQUENCY).toBe('weekly');
    });
  });

  describe('COMMITLINT', () => {
    it('should have default configuration', () => {
      expect(COMMITLINT.DEFAULTS.extends).toContain('@commitlint/config-conventional');
    });
  });

  describe('STYLELINT', () => {
    it('should have default configuration', () => {
      expect(STYLELINT.DEFAULTS.extends).toBeDefined();
      expect(STYLELINT.DEFAULTS.extends.length).toBeGreaterThan(0);
    });

    it('should have plugins defined', () => {
      expect(STYLELINT.PLUGINS.ORDER).toBe('stylelint-order');
    });
  });

  describe('TYPESCRIPT', () => {
    it('should have compiler options', () => {
      expect(TYPESCRIPT.COMPILER_OPTIONS.target).toBe('ES2020');
      expect(TYPESCRIPT.COMPILER_OPTIONS.strict).toBe(true);
      expect(TYPESCRIPT.COMPILER_OPTIONS.skipLibCheck).toBe(true);
    });

    it('should have library definitions', () => {
      expect(TYPESCRIPT.COMPILER_OPTIONS.lib).toContain('ES2020');
      expect(TYPESCRIPT.COMPILER_OPTIONS.lib).toContain('DOM');
    });
  });

  describe('JSCONFIG', () => {
    it('should have compiler options', () => {
      expect(JSCONFIG.COMPILER_OPTIONS.target).toBe('ES2020');
      expect(JSCONFIG.COMPILER_OPTIONS.strict).toBe(false);
    });

    it('should allow JavaScript and JSON', () => {
      expect(JSCONFIG.COMPILER_OPTIONS.allowJs).toBe(true);
      expect(JSCONFIG.COMPILER_OPTIONS.resolveJsonModule).toBe(true);
    });
  });

  describe('HUSKY', () => {
    it('should have version defined', () => {
      expect(HUSKY.DEFAULTS.version).toBe('9');
    });
  });
});
