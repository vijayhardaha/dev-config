# AGENTS.md

> **This file is the authoritative reference for AI agents (Cursor, Claude Code, opencode, etc.) working on the `@vijayhardaha/dev-config` codebase.**

## Project Overview

`@vijayhardaha/dev-config` is a reusable development configuration package for Next.js + TypeScript projects. It ships modular, configurable presets for ESLint, Biome, Prettier, Commitlint, Stylelint, Next Sitemap, TypeScript, JSConfig, and a SMACSS utility. Consumers import a single preset and spread it into their own config (ESLint via JS), or extend a `biome.json` preset via `extends` (Biome).

**Current version: 2.5.0** (unreleased at the time of this writing — `package.json` still reads `2.4.2`; release-it will bump it on `bun run release`).

**ESLint requirements:** ESLint >=10, native flat config only. No `FlatCompat`. TypeScript via `typescript-eslint` >=8.

## Development Commands

| Command                 | Description                            |
| ----------------------- | -------------------------------------- |
| `bun run lint`          | Run ESLint                             |
| `bun run lint:fix`      | Run ESLint with auto-fix               |
| `bun run format`        | Format all files with Prettier         |
| `bun run format:check`  | Check formatting without modifying     |
| `bun run test`          | Run tests with Vitest                  |
| `bun run test:watch`    | Run tests in watch mode                |
| `bun run test:coverage` | Run tests with coverage (target: 100%) |
| `bun run release`       | Bump version + publish (release-it)    |
| `bun run release:dry`   | Dry-run the release (no publish)       |

**Validation order:** `format` → `format:check` → `lint` → `test:coverage`. Always run the full chain before claiming a change is complete.

## Code Style Guidelines

- ESM only (`import` / `export`).
- ESLint flat config format.
- TypeScript via `@typescript-eslint/parser` and `typescript-eslint`; both must agree on the same major.
- Components: `PascalCase`. Functions and variables: `camelCase`. Files: `kebab-case`. Constants: `SCREAMING_SNAKE_CASE`. Test files: same name as the source under `__tests__/` with `.test.js` extension.
- Every exported, shared, or non-obvious function must carry JSDoc with `@param`, `@returns`, and a one-line summary before any tags.

## Architecture

The package is organized as **per-technology presets** under `src/presets/`, with shared helpers and constants under `src/lib/`. The flat layout makes each preset self-contained and easy to test in isolation.

```
src/
├── index.js                           - Main re-exports for the package root
├── __tests__/
│   └── index.test.js                  - Tests for the root barrel
│
├── presets/                           - One folder per technology
│   ├── commitlint/
│   │   ├── index.js                   - Commitlint config
│   │   └── __tests__/
│   │       └── index.test.js
│   ├── eslint/
│   │   ├── javascript.js              - JavaScript-only base preset
│   │   ├── typescript.js              - TypeScript preset
│   │   ├── react.js                   - React + TypeScript preset
│   │   ├── next.js                    - Next.js + React + TypeScript preset
│   │   ├── __tests__/                 - Tests for the four presets
│   │   │   ├── index.test.js
│   │   │   ├── javascript.test.js
│   │   │   ├── typescript.test.js
│   │   │   ├── react.test.js
│   │   │   ├── next.test.js
│   │   │   └── tailwind.test.js
│   │   ├── lib/                       - Shared internals across eslint presets
│   │   │   ├── build-config.js        - Config builder with orchestration
│   │   │   ├── ignores.js             - Global ignores (incl. Supabase .temp)
│   │   │   ├── config/                - Small focused configuration objects
│   │   │   │   ├── files.js           - File pattern constants
│   │   │   │   ├── language-options.js - Common language options
│   │   │   │   ├── parser.js          - Common TypeScript parser
│   │   │   │   └── __tests__/         - Co-located tests
│   │   │   │       ├── files.test.js
│   │   │   │       ├── language-options.test.js
│   │   │   │       └── parser.test.js
│   │   │   ├── rules/                 - Rule factories split by domain
│   │   │   │   ├── tailwind.js         - Tailwind class rules + plugin loaders
│   │   │   │   ├── jsdoc.js            - JSDoc rule groups for public/exported APIs
│   │   │   │   ├── common.js           - TypeScript, Prettier, and import order rules
│   │   │   │   ├── index.js            - Barrel (re-exports only)
│   │   │   │   └── __tests__/         - Co-located tests
│   │   │   │       ├── tailwind.test.js
│   │   │   │       ├── tailwind.optional-deps.test.js
│   │   │   │       ├── tailwind.prettier-interop.test.js
│   │   │   │       └── common.test.js
│   │   │   ├── index.js               - Barrel (re-exports only)
│   │   │   ├── __tests__/             - Tests for the flat lib/ files
│   │   │   │   ├── build-config.test.js
│   │   │   │   ├── build-config.branches.test.js
│   │   │   │   ├── build-config.optional-deps.test.js
│   │   │   │   ├── ignores.test.js
│   │   │   │   └── index.test.js
│   │   │   └── plugin-helpers/        - Plugin manipulation primitives
│   │   │       ├── enabled-plugins.js - Filter conditional plugins by options
│   │   │       ├── flatten.js         - Flatten mixed plugin arrays/objects
│   │   │       ├── fixup.js           - Wrap plugins via @eslint/compat
│   │   │       ├── parser.js          - Strip parser to avoid conflicts
│   │   │       ├── strip.js           - Remove centrally-registered plugins
│   │   │       ├── index.js           - Barrel (re-exports only)
│   │   │       └── __tests__/         - Co-located tests
│   │   │           ├── enabled-plugins.test.js
│   │   │           ├── flatten.test.js
│   │   │           ├── fixup.test.js
│   │   │           ├── parser.test.js
│   │   │           └── strip.test.js
│   │   └── recipes/                   - Opt-in config fragments consumers spread in
│   │       ├── tailwind.js            - Tailwind ESLint recipe (opt-in fragment)
│   │       ├── tailwind-plugins.js    - Lazy loader for the two Tailwind plugins
│   │       └── __tests__/             - Co-located tests
│   │           ├── tailwind.test.js
│   │           ├── tailwind.empty.test.js
│   │           ├── tailwind.integration.test.js
│   │           └── tailwind-plugins.missing.test.js
│   ├── biome/
│   │   ├── js.json                     - JavaScript-only Biome preset
│   │   ├── typescript.json             - TypeScript Biome preset
│   │   ├── react.json                  - React + TypeScript Biome preset
│   │   ├── next.json                   - Next.js + React + TypeScript Biome preset
│   │   └── __tests__/                  - Co-located tests
│   │       ├── js.test.js
│   │       ├── typescript.test.js
│   │       ├── react.test.js
│   │       └── next.test.js
│   ├── gulp-smacss/
│   │   ├── index.js                   - SMACSS property-order array
│   │   └── __tests__/
│   │       └── index.test.js
│   ├── jsconfig/
│   │   ├── index.json                 - JSConfig for IntelliSense
│   │   └── __tests__/
│   │       └── index.test.js
│   ├── next-sitemap/
│   │   ├── index.js                   - next-sitemap config (validated)
│   │   └── __tests__/
│   │       └── index.test.js
│   ├── prettier/
│   │   ├── index.js                   - Prettier config + overrides
│   │   └── __tests__/
│   │       └── index.test.js
│   ├── stylelint/
│   │   ├── index.js                   - Stylelint config
│   │   └── __tests__/
│   │       └── index.test.js
│   └── tsconfig/
│       ├── index.json                 - TypeScript base config
│       └── __tests__/
│           └── index.test.js
│
└── lib/                               - Shared helpers (no technology-specific logic)
    ├── constants/                     - Per-technology constant modules
    │   ├── eslint.js
    │   ├── prettier.js
    │   ├── commitlint.js
    │   ├── stylelint.js
    │   ├── sitemap.js
    │   ├── typescript.js
    │   ├── jsconfig.js
    │   ├── husky.js
    │   └── __tests__/                  - One test file per constants module
    │       ├── eslint.test.js
    │       ├── prettier.test.js
    │       ├── commitlint.test.js
    │       ├── stylelint.test.js
    │       ├── sitemap.test.js
    │       ├── typescript.test.js
    │       ├── jsconfig.test.js
    │       └── husky.test.js
    └── utils/                         - Grouped-domain utility helpers
        ├── object/
        │   ├── merge-deep.js
        │   ├── filter-entries.js
        │   ├── get-nested-value.js
        │   ├── set-nested-value.js
        │   └── is-plain-object.js
        ├── array/
        │   ├── flatten.js
        │   └── compact.js
        ├── file/
        │   └── file-override.js
        ├── validators/
        │   ├── primitives.js          - validateString, validateUrl, ...
        │   ├── collections.js         - validateArray, validateStringArray, ...
        │   ├── shapes.js              - validateObject, validateRules, ...
        │   └── numeric-range.js       - validateNumberInRange
        └── __tests__/                  - Tests mirror the source domains
            ├── object/
            │   ├── merge-deep.test.js
            │   ├── filter-entries.test.js
            │   ├── get-nested-value.test.js
            │   ├── set-nested-value.test.js
            │   └── is-plain-object.test.js
            ├── array/
            │   ├── flatten.test.js
            │   └── compact.test.js
            ├── file/
            │   └── file-override.test.js
            └── validators/
                ├── primitives.test.js
                ├── collections.test.js
                ├── shapes.test.js
                └── numeric-range.test.js
```

### Architectural Notes

- **One preset entry per technology.** Each preset folder exposes either a default export (eslint, prettier, commitlint, stylelint, next-sitemap, gulp-smacss) or a JSON file (tsconfig, jsconfig) plus, where useful, a `createConfig` function for options. The eslint preset additionally has a `recipes/` subdir for opt-in fragments.
- **Biome presets are self-contained JSON.** Unlike the ESLint presets, Biome has no plugin system and cannot transitively compose config files across `node_modules` (a file being extended cannot itself extend). Each of the four `biome/*.json` files therefore repeats the shared base rules inline rather than using internal `extends`. Consumers opt in via `biome.json` `extends: ["@vijayhardaha/dev-config/biome/<preset>"]`; later entries and consumer settings override earlier ones via deep merge.
- **Constants live in `src/lib/constants/`.** Each technology gets one file (e.g. `eslint.js`, `prettier.js`); import directly from the file you need. The old monolithic `src/config-constants.js` was removed in 2.5.0.
- **Helpers live in `src/lib/utils/`.** Grouped by domain (object, array, file, validators) instead of one utility per file. Validators are split into 4 small files (primitives, collections, shapes, numeric-range). Import directly from the file you need.
- **Plugin helpers** are isolated under `src/presets/eslint/lib/plugin-helpers/`. Each helper is a single, pure function with its own test file. The `build-config.js` orchestrator composes them.
- **Rule factories** are split by domain under `src/presets/eslint/lib/rules/`. `tailwind.js` owns the optional-plugin loaders, entry-point probing, Prettier interop, and Tailwind rules; `jsdoc.js` owns the JSDoc rule groups for public/exported APIs; `common.js` composes `tsRules`, `prettierRules`, `importOrderRules`, `jsdocRules`, and `tailwindRules` into the final `commonRules` object. The barrel `rules/index.js` re-exports the public surface (`commonRules`, `getTailwindCentralPlugins`, `tailwindSettings`); each file has a co-located test. `tailwindRules` and `resolveTailwindEntryPoint` are intentionally not re-exported because they are only consumed internally by `common.js` and `tailwindSettings`.
- **Pure-re-export barrels** (any `index.js` that only re-exports) are excluded from coverage so the 100% target reflects only executable logic. The only remaining barrel is `src/presets/eslint/lib/rules/index.js`; the `constants/` and `utils/` barrels were removed in 2.5.0 because every consumer already imports directly.
- **The Tailwind plugin loaders are lazy.** Both `eslint-plugin-better-tailwindcss` and `eslint-plugin-tailwindcss` are imported inside `recipes/tailwind.js` and `recipes/tailwind-plugins.js` so projects without Tailwind tooling pay no cost. Missing plugins are silently ignored; install hints are logged only under `DEBUG=eslint` or `DEBUG=*`.

## Configuration Options

### ESLint `createConfig` Options

All four eslint presets share the same `createConfig(options)` shape with optional flags. Each preset has a different default for `tailwind` (now `false` everywhere — Tailwind is opt-in via the recipe).

```javascript
// javascript preset (src/presets/eslint/javascript.js)
createConfig({
  prettier: true, // Prettier integration
  importOrder: true, // eslint-plugin-import-x/order
  jsdoc: true // JSDoc rules
  // ...plus: ignores, rules, settings, files, languageOptions,
  //          plugins, globalIgnores, extend
});

// typescript preset (src/presets/eslint/typescript.js)
// Same as javascript, no framework-specific options.

// react preset (src/presets/eslint/react.js)
createConfig({
  prettier: true,
  a11y: true, // eslint-plugin-jsx-a11y
  importOrder: true,
  jsdoc: true,
  tailwind: false // opt-in Tailwind rules
  // ...
});

// next preset (src/presets/eslint/next.js)
createConfig({
  prettier: true,
  react: true, // React-specific rule overrides
  a11y: true,
  importOrder: true,
  jsdoc: true,
  tailwind: false
  // ...
});
```

### Tailwind Recipe

The Tailwind class rules live in a separate opt-in recipe instead of inside the core configs. Consumers spread the recipe into their config array:

```javascript
import { createConfig } from "@vijayhardaha/dev-config/eslint/next";
import { tailwind } from "@vijayhardaha/dev-config/eslint/recipes/tailwind";

export default [...(await createConfig()), await tailwind({ entryPoint: "src/app/globals.css" })];
```

The recipe:

- Auto-probes for a Tailwind v4 entry stylesheet at `src/app/globals.css`, `app/globals.css`, `src/styles/globals.css`, `styles/globals.css`, `src/input.css`, `input.css` (relative to the provided `cwd`).
- Detects `prettier-plugin-tailwindcss` in the consumer's Prettier config and drops the class-ordering and line-wrapping rules when the formatter already handles them, avoiding `ESLintCircularFixesWarning`.
- Returns an empty `{ plugins: {}, settings: {}, rules: {} }` fragment when neither Tailwind plugin is installed.
- Accepts `{ entryPoint?, prettierConfigPath?, cwd? }`. `cwd` defaults to `process.cwd()`.

The legacy `createConfig({ tailwind: true })` flag on the React/Next presets still works and wires the same rules through the core config. The recipe is the recommended path because it gives explicit control over the entry point and the Prettier interop decision.

## Working with Config Files

### Root Config Files

These entry points consume the modular configs and live at the package root:

- `eslint.config.mjs` - ESLint flat config (uses `src/presets/eslint/javascript.js`)
- `prettier.config.mjs` - Prettier config (uses `src/presets/prettier/index.js`)
- `commitlint.config.mjs` - Commitlint config (uses `src/presets/commitlint/index.js`)
- `jsconfig.json` - IntelliSense config (extends `src/presets/jsconfig/index.json`)

### Adding a New Preset

1. Create `src/presets/<tech>/index.js` (or `index.json` for static config).
2. Add a constants file at `src/lib/constants/<tech>.js` if the preset has hardcoded defaults; consumers import directly from that path.
3. Add a co-located `__tests__/index.test.js` next to the source.
4. Update `package.json` `exports` to add the public entry point.
5. Update `src/index.js` if the preset should be re-exported from the package root.
6. Document the addition under `## [Unreleased]` or the in-progress version in `CHANGELOG.md`.

### Adding a New Recipe

1. Create the recipe at `src/presets/eslint/recipes/<name>.js` and any helper modules it needs.
2. Co-locate tests under `src/presets/eslint/recipes/__tests__/`. If the recipe depends on a module that is hard to mock (e.g. plugin loaders), put the mock-friendly helper in its own file so `vi.mock` can target it cleanly.
3. Lazy-load any optional plugins inside the recipe function so consumers without those plugins pay no cost.

## Peer Dependencies

**Required (consumer must install):**

- `eslint` (>=10)
- `eslint-config-prettier` (>=10)
- `prettier` (>=3)
- `globals` (>=17)
- `typescript` (>=6) and `typescript-eslint` (>=8) when using the typescript/react/next presets
- `@typescript-eslint/eslint-plugin` (>=8) and `@typescript-eslint/parser` (>=8) when using the typescript/react/next presets
- `eslint-plugin-import-x` (>=4)
- `eslint-plugin-prettier` (>=5)
- `eslint-plugin-jsdoc` (>=63)
- `@eslint/compat` (>=2)
- `@prettier/plugin-xml` (>=3) for XML Prettier support
- `husky` (>=9) for git hooks

**Optional (per-tech):**

- React: `eslint-plugin-react` (>=7), `eslint-plugin-react-hooks` (>=7), `eslint-plugin-jsx-a11y` (>=6)
- Next.js: `@next/eslint-plugin-next` (>=16), `eslint-config-next` (>=16), `next` (>=16)
- Tailwind recipe: `eslint-plugin-better-tailwindcss` (>=4), `eslint-plugin-tailwindcss` (>=4)
- TypeScript import resolution: `eslint-import-resolver-typescript` (>=4)
- Commitlint: `@commitlint/cli` (>=21), `@commitlint/config-conventional` (>=21), `@commitlint/types` (>=21)
- Stylelint: `stylelint` (>=17), `stylelint-config-property-sort-order-smacss` (>=11), `stylelint-config-standard-scss` (>=17), `stylelint-order` (>=8)
- Next Sitemap: `next-sitemap` (>=4)

The full peer-dependency list with `optional` flags lives in `package.json` under `peerDependencies` and `peerDependenciesMeta`.

## Public Exports

The package exposes the following public keys in `package.json` `exports`:

| Key                         | Target                                     |
| --------------------------- | ------------------------------------------ |
| `.`                         | `./src/index.js`                           |
| `./package.json`            | `./package.json`                           |
| `./eslint`                  | `./src/presets/eslint/javascript.js`       |
| `./eslint/js`               | `./src/presets/eslint/javascript.js`       |
| `./eslint/ts`               | `./src/presets/eslint/typescript.js`       |
| `./eslint/typescript`       | `./src/presets/eslint/typescript.js`       |
| `./eslint/react`            | `./src/presets/eslint/react.js`            |
| `./eslint/reactjs`          | `./src/presets/eslint/react.js`            |
| `./eslint/next`             | `./src/presets/eslint/next.js`             |
| `./eslint/nextjs`           | `./src/presets/eslint/next.js`             |
| `./eslint/recipes/tailwind` | `./src/presets/eslint/recipes/tailwind.js` |
| `./prettier`                | `./src/presets/prettier/index.js`          |
| `./commitlint`              | `./src/presets/commitlint/index.js`        |
| `./stylelint`               | `./src/presets/stylelint/index.js`         |
| `./next-sitemap`            | `./src/presets/next-sitemap/index.js`      |
| `./gulp-smacss`             | `./src/presets/gulp-smacss/index.js`       |
| `./tsconfig`                | `./src/presets/tsconfig/index.json`        |
| `./jsconfig`                | `./src/presets/jsconfig/index.json`        |
| `./biome/js`                | `./src/presets/biome/js.json`              |
| `./biome/ts`                | `./src/presets/biome/typescript.json`      |
| `./biome/react`             | `./src/presets/biome/react.json`           |
| `./biome/nextjs`            | `./src/presets/biome/next.json`            |

Removed aliases (kept here for context only — do not re-introduce): `./eslint/common`, `./eslint/base`. They pointed at the same target as `./eslint` and `./eslint/js`.

## Commit and Release Workflow

- All commits are applied by the user. The agent writes `.tmp/git.txt` and the user runs `source .tmp/git.txt`.
- Conventional Commits are used. Group `package.json` + `bun.lock` only for dep-version bumps. Pick the type and scope that match the action: `chore(deps):` for version bumps, `fix(<area>):` for source fixes, `refactor(<area>):` for internal restructuring, `docs(<area>):` for doc-only changes, `feat(<area>):` for new public capability, `test:` for test-only changes.
- The default commit cadence is one concern per commit. When in doubt, split.
- `bun run release` uses `release-it` to bump the version in `package.json` and publish. `CHANGELOG.md` is updated by hand at the time of the release.
