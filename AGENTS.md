# AGENTS.md

> **This file serves as the authoritative reference for AI agents (Cursor, Claude Code, etc.) working on the `@vijayhardaha/dev-config` codebase.**

## Project Overview

This is a reusable development configuration package (`@vijayhardaha/dev-config`) for Next.js + TypeScript projects. It provides modular, configurable presets for linting, formatting, and commit standards.

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

```
src/
  index.js         - Main exports
  index.test.js     - Tests for main exports
  eslint/
    index.js        - JavaScript config
    index.test.js    - Tests for JavaScript config
    typescript.js    - TypeScript config
    typescript.test.js - Tests for TypeScript config
    react.js         - React config
    react.test.js    - Tests for React config
    next.js          - Next.js config
    next.test.js      - Tests for Next.js config
    lib/
      index.js       - Shared lib exports
      index.test.js   - Tests for lib exports
      setup.js        - ESLint setup utilities
      setup.test.js   - Tests for setup
      files.js        - File patterns
      files.test.js   - Tests for files
      build-config.js - Config builder
      build-config.test.js - Tests for build-config
      ignores.js      - Global ignores
      ignores.test.js - Tests for ignores
      language-options.js - Language options
      language-options.test.js - Tests for language-options
      rules.js        - Rules configuration
      rules.test.js   - Tests for rules
  prettier/
    index.js         - Prettier config
    index.test.js    - Tests for Prettier config
  commitlint/
    index.js         - Commitlint config
    index.test.js    - Tests for Commitlint config
  stylelint/
    index.js         - Stylelint config
    index.test.js    - Tests for Stylelint config
  next-sitemap/
    index.js         - Next sitemap config
    index.test.js    - Tests for Next sitemap config
  tsconfig/
    index.json       - TypeScript base config
    index.test.js    - Tests for TSConfig
  jsconfig/
    index.json       - JSConfig for IntelliSense
    index.test.js    - Tests for JSConfig
```

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

- `eslint` (>=9)
- `prettier` (>=3)
- `vitest` (>=4)
- `husky` (>=9)
- `@eslint/compat` (>=2)
- `@eslint/eslintrc` (>=3)
- `@eslint/js` (>=9)
- `@typescript-eslint/eslint-plugin` (>=8)
- `@typescript-eslint/parser` (>=8)
- `typescript` (>=6)
- `eslint-plugin-import` (>=2)
- `eslint-import-resolver-typescript` (>=4)
- `eslint-config-prettier` (>=10)
- `eslint-plugin-prettier` (>=5)
- `eslint-plugin-jsdoc` (>=62)
- `globals` (>=17)

Optional packages (only if using specific configs):

- React: `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y`
- Next.js: `@next/eslint-plugin-next`, `eslint-config-next`
- Commitlint: `@commitlint/cli`, `@commitlint/config-conventional`, `@commitlint/types`
- Stylelint: `stylelint`, `stylelint-config-property-sort-order-smacss`, `stylelint-config-standard-scss`, `stylelint-order`
- Next Sitemap: `next-sitemap`
