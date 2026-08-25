/**
 * Barrel re-export for the shared utility functions. Importers should
 * prefer the direct file path (e.g. `../utils/object/merge-deep.js`) when
 * practical; this barrel exists for convenience and for any code that
 * needs the full set.
 */

export { mergeDeep } from './object/merge-deep.js';
export { filterObjectEntries } from './object/filter-entries.js';
export { getNestedValue } from './object/get-nested-value.js';
export { setNestedValue } from './object/set-nested-value.js';
export { isPlainObject } from './object/is-plain-object.js';

export { flattenArray } from './array/flatten.js';
export { compactArray } from './array/compact.js';

export { createFileOverride } from './file/file-override.js';

export {
  validateString,
  validateNonEmptyString,
  validateBoolean,
  validateNumber,
  validateUrl,
} from './validators/primitives.js';
export { validateArray, validateNonEmptyArray, validateStringArray } from './validators/collections.js';
export { validateObject, validateObjectKeys, validateRules, validateFilePatterns } from './validators/shapes.js';
export { validateNumberInRange } from './validators/numeric-range.js';
