// ── Positioning ──
const positioning = [
  'position',
  'z-index',
  'top',
  'right',
  'bottom',
  'left',
  'inset',
  'inset-block',
  'inset-inline',
  'inset-block-start',
  'inset-block-end',
  'inset-inline-start',
  'inset-inline-end',
];

// ── Display & visibility ──
const displayVisibility = ['display', 'visibility', 'opacity'];

// ── Float & clear ──
const floatClear = ['float', 'clear'];

// ── Flex & grid ──
const flexGrid = [
  'flex',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'flex-flow', // shorthand for flex-direction + flex-wrap
  'flex-direction',
  'flex-wrap',
  'justify-content',
  'align-items',
  'align-self',
  'align-content',
  'place-items',
  'place-content',
  'place-self',
  'order',
  'gap',
  'row-gap',
  'column-gap',
  'grid',
  'grid-template',
  'grid-template-columns',
  'grid-template-rows',
  'grid-template-areas',
  'grid-area',
  'grid-column',
  'grid-row',
  'grid-auto-flow',
  'grid-auto-columns',
  'grid-auto-rows',
];

// ── Box model ──
const boxModel = [
  'columns',
  'column-width',
  'column-count',
  'column-rule',
  'column-span',
  'column-fill',
  'width',
  'min-width',
  'max-width',
  'height',
  'min-height',
  'max-height',
  'aspect-ratio',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-block',
  'margin-inline',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-block',
  'padding-inline',
  'overflow',
  'overflow-x',
  'overflow-y',
  'box-sizing',
];

// ── Border ──
const border = [
  'border',
  'border-top',
  'border-right',
  'border-bottom',
  'border-left',
  'border-color',
  'border-style',
  'border-width',
  'border-radius',
  'border-image',
  'border-image-source',
  'border-image-slice',
  'border-image-width',
  'border-image-outset',
  'border-image-repeat',
  'outline',
  'outline-color',
  'outline-style',
  'outline-width',
  'box-shadow',
];

// ── Table ──
const table = ['border-collapse', 'border-spacing', 'table-layout', 'caption-side', 'empty-cells'];

// ── Background ──
const background = [
  'background',
  'background-color',
  'background-image',
  'background-repeat',
  'background-position',
  'background-size',
  'background-clip',
  'background-origin',
  'background-attachment',
  'background-blend-mode',
];

// ── Text & typography ──
const textTypography = [
  'color',
  'font',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'font-variant',
  'font-variant-caps',
  'font-variant-ligatures',
  'font-variant-numeric',
  'font-variant-east-asian',
  'font-kerning',
  'font-feature-settings',
  'font-optical-sizing',
  'font-stretch',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'text-align',
  'text-align-last',
  'text-justify',
  'text-indent',
  'text-transform',
  'text-decoration',
  'text-decoration-color',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-underline-offset',
  'text-underline-position',
  'text-shadow',
  'text-overflow',
  'white-space',
  'word-break',
  'overflow-wrap',
  'word-wrap', // legacy alias for overflow-wrap
  'hyphens',
  'tab-size',
  'vertical-align',
  'direction',
  'writing-mode',
  'text-orientation',
  'text-rendering',
];

// ── Lists, counters & quotes ──
const listsCounters = [
  'list-style',
  'list-style-type',
  'list-style-position',
  'list-style-image',
  'content',
  'quotes',
  'counter-reset',
  'counter-increment',
  'counter-set',
];

// ── Transform & animation ──
const transformAnimation = [
  'transform',
  'transform-origin',
  'transform-style',
  'perspective',
  'perspective-origin',
  'backface-visibility',
  'transition',
  'transition-property',
  'transition-duration',
  'transition-timing-function',
  'transition-delay',
  'animation',
  'animation-name',
  'animation-duration',
  'animation-timing-function',
  'animation-delay',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
  'animation-play-state',
  'filter',
  'backdrop-filter',
  'mix-blend-mode',
  'isolation',
];

// ── Cursor & pointer ──
const cursorPointer = ['cursor', 'pointer-events', 'user-select'];

// ── Scroll ──
const scroll = [
  'scroll-behavior',
  'scroll-snap-type',
  'scroll-snap-align',
  'scroll-snap-stop',
  'scroll-margin',
  'scroll-padding',
  'overscroll-behavior',
];

// ── Other ──
const other = [
  'clip-path',
  'clip',
  'object-fit',
  'object-position',
  'resize',
  'appearance',
  'accent-color',
  'caret-color',
  'color-scheme',
  'contain',
  'container',
  'container-type',
  'container-name',
];

// ── Final merged order (SMACSS) ──
/**
 * Ordered CSS property groups following the SMACSS methodology.
 *
 * @type {string[]}
 */
export const smacssOrder = [
  ...positioning,
  ...displayVisibility,
  ...floatClear,
  ...flexGrid,
  ...boxModel,
  ...border,
  ...table,
  ...background,
  ...textTypography,
  ...listsCounters,
  ...transformAnimation,
  ...cursorPointer,
  ...scroll,
  ...other,
];
