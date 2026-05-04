import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates a FlatCompat instance for using flat config format with older
 * ESLint configurations.
 */
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: js.configs.recommended });

/**
 * Returns the setup object containing shared utilities for ESLint configs.
 *
 * @returns {{ compat: FlatCompat, tsParser: typeof tsParser, __dirname: string }} Reusable setup utilities for ESLint configurations.
 */
export const setup = () => ({ compat, tsParser, __dirname });

/**
 * Common parser configuration for TypeScript files.
 *
 * @type {{ parser: typeof tsParser }}
 */
export const commonParser = { parser: tsParser };
