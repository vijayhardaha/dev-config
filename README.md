# @vijayhardaha/dev-config

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/%40vijayhardaha%2Fdev-config)](https://www.npmjs.com/package/@vijayhardaha/dev-config)
[![Downloads](https://img.shields.io/npm/dm/%40vijayhardaha%2Fdev-config)](https://www.npmjs.com/package/@vijayhardaha/dev-config)

Reusable development configuration package for Next.js + TypeScript projects.

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
bun install @vijayhardaha/dev-config --dev
```

### Install Required Packages

```bash
bun add --dev eslint prettier @prettier/plugin-xml eslint-plugin-prettier globals eslint-plugin-jsdoc eslint-plugin-import-x typescript typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### Install Optional Packages

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
```

#### Commitlint

```bash
bun add --dev husky @commitlint/cli @commitlint/config-conventional @commitlint/types
```

#### Next Sitemap

```bash
bun add --dev next-sitemap
```

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
