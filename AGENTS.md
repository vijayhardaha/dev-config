# AGENTS.md

> **This file serves as the authoritative reference for AI agents (Cursor, Claude Code, etc.) working on the `vdo` codebase.**

## Project Overview

This is a reusable development configuration package (`@vijayhardaha/dev-config`) for Next.js + TypeScript projects. It provides modular, configurable presets for linting, formatting, and commit standards.

## Development Commands

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

### Naming Conventions

- Components: `PascalCase`
- Functions/variables: `camelCase`
- Files: `kebab-case`
- Constants: `SCREAMING_SNAKE_CASE`
-

## Architecture

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

## Git Workflow

Pre-commit hooks automatically run type check, lint, and format checks.

**Before preparing git.md (after each task):**

1. Run `npm run format:check` - Format check
2. Run `npm run lint` - ESLint check

**After completing a task:**

1. Check unstaged changes: `git status --porcelain`
2. Stage files: `git add <files>`
3. Create `.tmp/git.md` containing the staged files and commit command

Example `.tmp/git.md`:

```bash
git add src/content/index.tsx
git commit -m "feat: add version dropdown selector

- fetch versions from npm registry
- render dropdown with recent versions"
```

## Commit Conventions

**Format:** `<type>(<scope>): <summary>`

**Types:** `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `build`, `chore`

**Rules:** Subject line ≤72 chars, blank line after subject, body wrapped at 100 chars.
