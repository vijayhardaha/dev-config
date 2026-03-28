/**
 * =====================================================================
 * commitlint.config.mjs
 * =====================================================================
 * Purpose: Commitlint configuration for enforcing conventional commit
 *          messages.
 * Docs: https://commitlint.js.org/#/
 * Usage: npx commitlint --from=HEAD~1
 * =====================================================================
 */

import commitlintConfig from './src/commitlint/index.js';

export default commitlintConfig;
