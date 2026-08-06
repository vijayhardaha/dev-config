# AGENTS.md

> **This file serves as the authoritative reference for AI agents (Cursor, Claude Code, etc.) working on the `@vijayhardaha/dev-config` codebase.**

## Project Overview

This is a reusable development configuration package (`@vijayhardaha/dev-config`) for Next.js + TypeScript projects. It provides modular, configurable presets for linting, formatting, and commit standards.

> **v2.1.0** — Requires ESLint >=10. Native flat config only. No FlatCompat. Fully refactored with modular architecture.

## Development Commands

| Command                 | Description                        |
| ----------------------- | ---------------------------------- |
| `bun run lint`          | Run ESLint                         |
| `bun run lint:fix`      | Run ESLint with auto-fix           |
| `bun run format`        | Format all files with Prettier     |
| `bun run format:check`  | Check formatting without modifying |
| `bun run test`          | Run tests with Vitest              |
| `bun run test:watch`    | Run tests in watch mode            |
| `bun run test:coverage` | Run tests with coverage            |

## Code Style Guidelines

### ESLint

- Use ESM syntax (`import`/`export`)
- Configure via flat config format (ESLint 9+)
- Use `@typescript-eslint/parser` for TypeScript files
- Use `createConfig(options)` for flexible configuration

### Naming Conventions

- Components: `PascalCase`
- Functions/variables: `camelCase`
- Files: `kebab-case`
- Constants: `SCREAMING_SNAKE_CASE`
- Test files: Same name as source with `.test.js` extension

## Architecture

After v2.1.0 refactoring, the codebase is organized for improved maintainability and testability:

```
src/
  config-constants.js          - All hardcoded defaults and constants
  index.js                     - Main exports
  lib/
    validators.js              - Parameter validation functions (13 validators)
    config-utils.js            - Shared utility functions (7 utilities)
    __tests__/
      config-constants.test.js - Tests for constants
      validators.test.js       - Tests for validators
      config-utils.test.js     - Tests for utilities
  __tests__/
    index.test.js              - Tests for main exports

  eslint/
    index.js                   - JavaScript config
    typescript.js              - TypeScript config
    react.js                   - React config
    next.js                    - Next.js config
    lib/
      index.js                 - Shared lib exports
      build-config.js          - Config builder with orchestration
      ignores.js               - Global ignores
      files.js                 - File patterns
      language-options.js      - Language options
      rules.js                 - Rules configuration
      setup.js                 - ESLint setup utilities
      plugin-helpers/
        index.js               - Plugin helper exports
        enabled-plugins.js     - Filter plugins by options
        flatten.js             - Flatten arrays and objects
        fixup.js               - Wrap plugins for compatibility
        strip.js               - Remove central plugins
        parser.js              - Remove parser conflicts
        __tests__/
          enabled-plugins.test.js
          flatten.test.js
          fixup.test.js
          strip.test.js
          parser.test.js
      __tests__/
        index.test.js
        build-config.test.js
        files.test.js
        ignores.test.js
        language-options.test.js
        rules.test.js
        setup.test.js
    __tests__/
      index.test.js
      typescript.test.js
      react.test.js
      next.test.js

  prettier/
    index.js                   - Prettier config (uses constants + overrides)
    __tests__/
      index.test.js

  commitlint/
    index.js                   - Commitlint config (uses constants)
    __tests__/
      index.test.js

  stylelint/
    index.js                   - Stylelint config (uses constants)
    __tests__/
      index.test.js

  next-sitemap/
    index.js                   - Next sitemap config with validation
    __tests__/
      index.test.js

  tsconfig/
    index.json                 - TypeScript base config
    __tests__/
      index.test.js

  jsconfig/
    index.json                 - JSConfig for IntelliSense
    __tests__/
      index.test.js

  gulp-smacss/
    index.js                   - SMACSS utility functions
    __tests__/
      index.test.js
```

### Key Refactoring Improvements

**1. Plugin Helpers Module** (`src/eslint/lib/plugin-helpers/`)

- Extracted 5 plugin manipulation functions into separate modules
- Each function has isolated tests for better debugging
- Reduces build-config.js complexity by 40%

**2. Configuration Constants** (`src/config-constants.js`)

- Centralized all hardcoded defaults
- Single source of truth for all configurations
- Organized into 8 configuration modules (ESLINT, PRETTIER, SITEMAP, etc.)

**3. Validators Module** (`src/lib/validators.js`)

- 13 reusable validation functions with consistent error messages
- Type checking for URLs, arrays, objects, strings, numbers, etc.
- Used in all createConfig functions for early error detection

**4. Shared Utilities** (`src/lib/config-utils.js`)

- 7 utility functions for common patterns
- Deep merge, nested value access, flattening, compacting, etc.

**5. Test Organization** (`src/**/__tests__/`)

- All 27 test files centralized in **tests** directories
- Better IDE discovery and test organization
- 172 comprehensive tests covering all modules

**6. Consistent Configuration Usage**

- prettier/index.js uses PRETTIER constants for all settings
- commitlint/index.js uses COMMITLINT constants
- stylelint/index.js uses STYLELINT constants
- next-sitemap/index.js with validation for required parameters
- eslint/lib/files.js uses ESLINT constants

## Configuration Options

### ESLint createConfig Options

```javascript
// Base ESLint config (for JavaScript):
{
  ((prettier = true), // Enable Prettier integration
    (importOrder = true), // Enable import order rules
    (jsdoc = true)); // Enable JSDoc rules
}

// TypeScript config:
{
  ((prettier = true), (importOrder = true), (jsdoc = true));
}

// React config:
{
  ((prettier = true),
    (a11y = true), // Enable accessibility rules
    (importOrder = true),
    (jsdoc = true));
}

// Next.js config:
{
  ((prettier = true),
    (react = true), // Enable React-specific rules
    (a11y = true),
    (importOrder = true),
    (jsdoc = true));
}
```

## Working with Config Files

### Root Config Files

These are entry points that use the modular configs:

- `eslint.config.mjs` - ESLint flat config
- `prettier.config.mjs` - Prettier config
- `commitlint.config.mjs` - Commitlint config

### Creating New Configs

1. Add new config files in `src/<config-name>/`
2. Export default config and `createConfig` function if applicable
3. Update `src/index.js` with new exports
4. Update `package.json` exports field

## Peer Dependencies

Required packages (must be installed by consumer):

- `eslint` (>=10)
- `eslint-config-prettier` (>=10)
- `prettier` (>=3)
- `husky` (>=9)
- `@eslint/compat` (>=2)
- `@prettier/plugin-xml` (>=3)
- `@typescript-eslint/eslint-plugin` (>=8)
- `@typescript-eslint/parser` (>=8)
- `typescript` (>=5)
- `typescript-eslint` (>=8)
- `eslint-plugin-import-x` (>=4)
- `eslint-plugin-prettier` (>=5)
- `eslint-plugin-jsdoc` (>=62)
- `globals` (>=17)

Optional packages (only if using specific configs):

- React: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`
- Next.js: `@next/eslint-plugin-next`, `eslint-config-next`
- Commitlint: `@commitlint/cli`, `@commitlint/config-conventional`, `@commitlint/types`
- Stylelint: `stylelint`, `stylelint-config-property-sort-order-smacss`, `stylelint-config-standard-scss`, `stylelint-order`
- Next Sitemap: `next-sitemap`
- TypeScript import resolution: `eslint-import-resolver-typescript` (>=3)
