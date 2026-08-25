/**
 * ========================================================================
 * Vitest Configuration
 * ========================================================================
 * Test runner config for unit tests with coverage.
 * Docs: https://vitest.dev/config/
 * ========================================================================
 */

import { resolve } from 'path';

/**
 * @type {import('vitest/config').UserConfig}
 */
const config = {
  // Shorthand for src/ imports
  resolve: { alias: { '@': resolve('.', 'src') } },

  // --- Tests Configs ---
  test: {
    // Node environment (no browser/DOM needed for CLI utils)
    environment: 'node',

    // Generous per-test budget: coverage instrumentation slows cold imports
    // of heavy config graphs past the 5s default under load spikes
    testTimeout: 20000,

    // Mock console output to reduce test noise
    setupFiles: ['./vitest.setup.mjs'],

    // Allow `describe`, `it`, `expect`, `vi` without imports
    globals: true,

    // Test file patterns
    include: ['**/*.test.{js,mjs,cjs,ts,tsx}', '**/*.spec.{js,mjs,cjs,ts,tsx}'],

    // V8-based coverage with text/json/html reports
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,mjs,cjs,ts,tsx}'],
      exclude: [
        'node_modules/',
        'vitest.config.mjs',
        'vitest.setup.mjs',
        '**/*.test.{js,mjs,cjs,ts,tsx}',
        '**/*.spec.{js,mjs,cjs,ts,tsx}',
        '**/dist/',
        '**/build/',

        // Pure re-export barrels with no executable logic of their own
        'src/index.js',
        'src/presets/eslint/lib/index.js',
        'src/presets/eslint/lib/plugin-helpers/index.js',
        'src/presets/eslint/lib/rules/index.js',
      ],
    },
  },
};

export default config;
