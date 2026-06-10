# @vijayhardaha/dev-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/%40vijayhardaha%2Fdev-config)](https://www.npmjs.com/package/@vijayhardaha/dev-config)
[![Downloads](https://img.shields.io/npm/dm/%40vijayhardaha%2Fdev-config)](https://www.npmjs.com/package/@vijayhardaha/dev-config)

Reusable development configuration package for Next.js + TypeScript projects.

> **v2.1.0** — Requires ESLint >=10. Native flat config only. No FlatCompat.

## Features

- **ESLint** - Modular flat config with support for JavaScript, TypeScript, React, and Next.js
- **Prettier** - Consistent code formatting with language-specific rules
- **Commitlint** - Enforces conventional commit messages
- **TypeScript** - Base configuration for type checking
- **JSConfig** - IntelliSense support for JavaScript projects
- **Stylelint** - CSS/SCSS linting configuration
- **Next Sitemap** - Sitemap generation configuration

## Installation

```bash
bun add --dev @vijayhardaha/dev-config
```

### Install Required Packages

```bash
bun add --dev eslint @eslint/compat @eslint/js eslint-config-prettier prettier @prettier/plugin-xml eslint-plugin-prettier globals eslint-plugin-jsdoc eslint-plugin-import-x @typescript-eslint/eslint-plugin @typescript-eslint/parser typescript typescript-eslint husky
```

### Install Optional Packages

Only install what you need based on your project setup.

#### TypeScript Import Resolution

```bash
bun add --dev eslint-import-resolver-typescript
```

#### Stylelint

```bash
bun add --dev stylelint stylelint-config-property-sort-order-smacss stylelint-config-standard-scss stylelint-order
```

#### React

```bash
bun add --dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

#### Next.js

```bash
bun add --dev @next/eslint-plugin-next eslint-config-next
bun add --dev next
```

#### Commitlint

```bash
bun add --dev @commitlint/cli @commitlint/config-conventional @commitlint/types
```

#### Next Sitemap

```bash
bun add --dev next-sitemap
```

## Migrating from v1

v2 drops FlatCompat and uses native ESLint 10 flat configs throughout.

### What changed

- **ESLint 10 required** — no longer compatible with ESLint 8/9
- **No FlatCompat** — all configs import flat config arrays/objects directly
- **`eslint-plugin-import` → `eslint-plugin-import-x`** — the ESLint 10-compatible fork
- **`eslint-config-prettier` restored** — required by `eslint-plugin-prettier/recommended`
- **`@eslint/js` restored** — used for the JavaScript recommended rule set
- **`plugins` option now accepts flat config arrays/objects** — no string-based plugin names

### Required updates

1. Install ESLint 10+: `bun add --dev eslint@10`
2. Replace `eslint-plugin-import` with `eslint-plugin-import-x`
3. Remove unused deps: `@eslint/eslintrc`, `eslint-plugin-import`

### What's new in v2.0.4

- **`eslint-config-prettier` restored** — added back to peer deps (required by `eslint-plugin-prettier/recommended`)
- **`eslint-import-resolver-typescript` restored** — added back as optional peer for TypeScript import resolution
- **All packages declared as peer deps** — every config module's dependencies are declared with proper `peerDependenciesMeta`
- **Flat config resolver fix** — switched from string-based `import-x/resolver` to `import-x/resolver-next` with `createTypeScriptImportResolver` for ESLint 10 compatibility

### What's new in v2.1.0

- **Root import no longer loads optional ESLint integrations** — use ESLint subpath imports for TypeScript, React, and Next.js presets.
- **JavaScript recommended rules restored** — the base JavaScript preset now includes `@eslint/js` recommended rules.
- **Next.js peer dependency declared** — the Next.js preset requires `next` because `eslint-config-next` resolves Next's bundled ESLint parser.
- **Custom file patterns honored consistently** — TypeScript, React, and Next.js presets merge `options.files` into their generated file patterns.

## Quick Start

### ESLint

Create `eslint.config.mjs` in your project root:

```javascript
import { createConfig } from "@vijayhardaha/dev-config/eslint/next";

export default createConfig();
```

### Prettier

Create `prettier.config.mjs` in your project root:

```javascript
import prettierConfig from "@vijayhardaha/dev-config/prettier";

export default prettierConfig;
```

### Commitlint

Create `commitlint.config.mjs` in your project root:

```javascript
import commitlintConfig from "@vijayhardaha/dev-config/commitlint";

export default commitlintConfig;
```

### Stylelint

Create `stylelint.config.mjs` in your project root:

```javascript
import stylelintConfig from "@vijayhardaha/dev-config/stylelint";

export default stylelintConfig;
```

### Next Sitemap

Create `next-sitemap.config.mjs` in your project root:

```javascript
import { createSitemapConfig } from "@vijayhardaha/dev-config/next-sitemap";

export default createSitemapConfig({ siteUrl: "https://yourdomain.com" });
```

### TypeScript

Create `tsconfig.json` in your project root:

```json
{ "extends": "@vijayhardaha/dev-config/tsconfig" }
```

### JavaScript

Create `jsconfig.json` in your project root:

```json
{ "extends": "@vijayhardaha/dev-config/jsconfig" }
```

## Configuration Options

### ESLint

```javascript
import { createConfig } from "@vijayhardaha/dev-config/eslint/next";

export default createConfig({
  prettier: true, // Enable Prettier integration
  importOrder: true, // Enable import ordering
  react: true, // Enable React rules
  a11y: true, // Enable accessibility rules
  jsdoc: true // Enable JSDoc rules
});
```

Available configs:

- `@vijayhardaha/dev-config/eslint` - JavaScript
- `@vijayhardaha/dev-config/eslint/ts` - TypeScript
- `@vijayhardaha/dev-config/eslint/react` - React + TypeScript
- `@vijayhardaha/dev-config/eslint/next` - Next.js + React + TypeScript

## Scripts

| Command                 | Description             |
| ----------------------- | ----------------------- |
| `bun run lint`          | Run ESLint              |
| `bun run lint:fix`      | Auto-fix ESLint issues  |
| `bun run format`        | Format with Prettier    |
| `bun run format:check`  | Check formatting        |
| `bun run test`          | Run tests with Vitest   |
| `bun run test:watch`    | Run tests in watch mode |
| `bun run test:coverage` | Run tests with coverage |

## Testing

This package includes comprehensive tests for all configuration modules:

- ESLint configs (JavaScript, TypeScript, React, Next.js)
- ESLint lib modules (setup, files, build-config, ignores, language-options, rules)
- Prettier, Commitlint, Stylelint configs
- Next Sitemap, TypeScript, and JavaScript configs

Run tests with:

```bash
bun run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
