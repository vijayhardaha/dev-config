/**
 * Stylelint configuration constants used to seed the stylelint preset.
 */

/**
 * @type {{
 *   DEFAULTS: { extends: string[] },
 *   PLUGINS: { ORDER: string }
 * }}
 */
export const STYLELINT = {
  // Defaults
  DEFAULTS: { extends: ['stylelint-config-standard-scss', 'stylelint-config-property-sort-order-smacss'] },

  // Plugins
  PLUGINS: { ORDER: 'stylelint-order' },
};
