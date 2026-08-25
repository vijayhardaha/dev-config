/**
 * Create a configuration override for specific file patterns.
 *
 * @param {string[]} files - File patterns to match.
 * @param {object} options - Override options.
 *
 * @returns {object} Override configuration object.
 *
 * @example
 * const override = createFileOverride(['*.py'], { tabWidth: 4 });
 * // Returns: { files: ['*.py'], options: { tabWidth: 4 } }
 */
export function createFileOverride(files, options) {
  return { files, options };
}
