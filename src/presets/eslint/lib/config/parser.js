import tsParser from '@typescript-eslint/parser';

/**
 * Common parser configuration for TypeScript files.
 *
 * @type {{ parser: typeof tsParser }}
 */
export const commonParser = { parser: tsParser };
