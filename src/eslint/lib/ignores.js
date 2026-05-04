import { globalIgnores as eslintGlobalIgnores } from 'eslint/config';

/**
 * Git-related ignore patterns.
 */
const gitIgnores = ['**/.git/', '**/.husky/'];

/**
 * IDE and editor ignore patterns.
 */
const ideIgnores = ['**/.idea/', '**/.vscode/'];

/**
 * Node.js and package manager ignore patterns.
 */
const nodeIgnores = ['**/node_modules/'];

/**
 * Build and output ignore patterns.
 */
const buildIgnores = [
  '**/.next/',
  '**/.turbo/',
  '**/.vercel/',
  '**/*.tsbuildinfo',
  '**/assets/',
  '**/build/',
  '**/dist/',
  '**/out/',
];

/**
 * Test and coverage ignore patterns.
 */
const testIgnores = ['**/coverage/', '**/test-results/', '**/.playwright-report/'];

/**
 * Cache and temporary file ignore patterns.
 */
const cacheIgnores = ['**/.cache/', '**/*.log', '**/.DS_Store', '**/Thumbs.db', '**/*.tmp'];

/**
 * Environment and config file ignore patterns.
 */
const envIgnores = ['**/.env*', '**/next-env.d.ts'];

/**
 * OS-specific ignore patterns.
 */
const osIgnores = ['**/.DS_Store', '**/Thumbs.db'];

/**
 * Next.js-specific ignore patterns.
 */
const nextIgnores = ['**/.next/', '**/next-env.d.ts'];

/**
 * Netlify-specific ignore patterns.
 */
const netlifyIgnores = ['**/.netlify/'];

/**
 * Vercel-specific ignore patterns.
 */
const vercelIgnores = ['**/.vercel/'];

/**
 * Svelte-specific ignore patterns.
 */
const svelteIgnores = ['**/.svelte-kit/'];

/**
 * Webpack-specific ignore patterns.
 */
const webpackIgnores = ['**/webpack-cache/'];

/**
 * Gulp-specific ignore patterns.
 */
const gulpIgnores = ['**/.gulp/'];

/**
 * Grunt-specific ignore patterns.
 */
const gruntIgnores = ['**/.grunt/'];

/**
 * Public assets ignore patterns.
 */
const publicIgnores = ['**/public/'];

/**
 * AI coding tools ignore patterns.
 */
const aiIgnores = ['**/.claude/', '**/.codex/', '**/.kilo/', '**/.opencode/', '**/.qoder/', '**/.vibe/', '**/.droid/'];

/**
 * Minified files ignore patterns.
 */
const minifiedIgnores = ['**/*.min.js', '**/*.min.css', '**/*.min.js.map', '**/*.min.css.map'];

/**
 * WordPress-specific ignore patterns.
 */
const wordpressIgnores = [
  '**/wp-admin/',
  '**/wp-includes/',
  '**/wp-content/uploads/',
  '**/wp-content/cache/',
  '**/wp-content/upgrade/',
  '**/wp-config.php',
  '**/wp-*.php',
];

/**
 * WooCommerce-specific ignore patterns.
 */
const woocommerceIgnores = [
  '**/wc-logs/',
  '**/wc-transients/',
  '**/wp-content/plugins/woocommerce/**/*.min.js',
  '**/wp-content/plugins/woocommerce/**/*.min.css',
];

/**
 * PHP-specific ignore patterns.
 */
const phpIgnores = ['**/vendor/', '**/.php-cs-fixer-cache', '**/composer.lock', '**/phpunit.xml', '**/coverage/'];

/**
 * Laravel-specific ignore patterns.
 */
const laravelIgnores = [
  '**/vendor/',
  '**/storage/',
  '**/bootstrap/cache/',
  '**/.env',
  '**/.env.*',
  '**/composer.lock',
  '**/phpunit.xml',
  '**/coverage/',
];

/**
 * Default global ignore patterns - combines all common patterns.
 */
const defaultIgnores = [
  ...gitIgnores,
  ...ideIgnores,
  ...nodeIgnores,
  ...buildIgnores,
  ...testIgnores,
  ...cacheIgnores,
  ...envIgnores,
  ...osIgnores,
  ...nextIgnores,
  ...netlifyIgnores,
  ...vercelIgnores,
  ...svelteIgnores,
  ...webpackIgnores,
  ...gulpIgnores,
  ...gruntIgnores,
  ...publicIgnores,
  ...aiIgnores,
  ...wordpressIgnores,
  ...woocommerceIgnores,
  ...phpIgnores,
  ...laravelIgnores,
  ...minifiedIgnores,
];

/**
 * Creates a global ignores configuration using ESLint's globalIgnores helper.
 * Merges provided ignores with default ignores and filters for unique values.
 *
 * @param {string[]} [userIgnores] - Additional ignore patterns to merge.
 *
 * @returns {import('eslint').Linter.Config[]} Global ignores configuration.
 */
export const globalIgnores = (userIgnores = []) => {
  const merged = [...defaultIgnores, ...userIgnores];
  const unique = [...new Set(merged)];
  return [eslintGlobalIgnores(unique)];
};
