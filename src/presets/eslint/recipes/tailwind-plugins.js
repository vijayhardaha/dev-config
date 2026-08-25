/**
 * Lazy loader for the optional Tailwind ESLint plugins. Extracted from the
 * recipe so it can be mocked in tests without disturbing module-level
 * imports of the recipe itself.
 *
 * @returns {Promise<{ better: object|null, core: object|null }>} Resolved plugin objects.
 */
export const loadTailwindPlugins = async () => {
  let better = null;

  try {
    better = (await import('eslint-plugin-better-tailwindcss')).default;
  } catch {
    if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
      console.debug(
        '[ESLint Config] Optional dependency "eslint-plugin-better-tailwindcss" not found. '
          + 'Tailwind class wrapping, ordering, and canonicalization rules will be disabled. '
          + 'Install it with: npm install --save-dev eslint-plugin-better-tailwindcss'
      );
    }
  }

  let core = null;

  try {
    core = (await import('eslint-plugin-tailwindcss')).default;
  } catch {
    if (process.env.DEBUG?.includes('eslint') || process.env.DEBUG === '*') {
      console.debug(
        '[ESLint Config] Optional dependency "eslint-plugin-tailwindcss" not found. '
          + 'Arbitrary value scale replacement will be disabled. '
          + 'Install it with: npm install --save-dev eslint-plugin-tailwindcss'
      );
    }
  }

  return { better, core };
};
