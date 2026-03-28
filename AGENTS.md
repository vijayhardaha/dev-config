# Dev Config - Agent Instructions

## Project Overview

This is a reusable development configuration package (`@vijayhardaha/dev-config`) for Next.js + TypeScript projects. It provides modular, configurable presets for linting, formatting, and commit standards.

## Key Commands

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run lint`         | Run ESLint                         |
| `npm run lint:fix`     | Run ESLint with auto-fix           |
| `npm run format`       | Format all files with Prettier     |
| `npm run format:check` | Check formatting without modifying |

## Code Style Guidelines

### ESLint

- Use ESM syntax (`import`/`export`)
- Configure via flat config format (ESLint 9+)
- Use `@typescript-eslint/parser` for TypeScript files
- Use `createConfig(options)` for flexible configuration

### Prettier

- Print width: 120 characters
- Tab width: 2 spaces (JS/TS), 4 spaces (Python/PHP)
- Single quotes for JS/TS files
- Trailing commas: es5 (JS/TS), none (JSON/YAML/MD)

### Git Commits

- Follow conventional commit format
- Header max: 50 characters
- Body max: 72 characters per line
- Types: feat, fix, docs, style, refactor, test, chore

## File Structure

```
src/
  index.js         - Main exports
  eslint/
    common.js      - Shared ESLint setup
    index.js       - JavaScript config
    typescript.js  - TypeScript config
    react.js       - React config
    next.js        - Next.js config
  prettier/        - Prettier config
  commitlint/      - Commitlint config
  stylelint/       - Stylelint config
  next-sitemap/    - Next sitemap config
  typescript/      - TypeScript base config
  jsconfig/        - JSConfig for IntelliSense
```

## Configuration Options

### ESLint createConfig Options

```javascript
// Available options with defaults (all true):
{
  (prettier, importOrder);
}
// TypeScript config:
{
  (prettier, importOrder);
}
// React config:
{
  (prettier, a11y, importOrder);
}
// Next.js config:
{
  (prettier, react, a11y, importOrder);
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
