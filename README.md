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
npm install @vijayhardaha/dev-config --save-dev
```

### Install Required Packages

```bash
npm install --save-dev eslint@9.39.4 @eslint/js@9.39.4 @eslint/compat @eslint/eslintrc eslint-config-prettier eslint-plugin-prettier globals prettier typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import eslint-import-resolver-typescript
```

### Install Optional Packages

#### Stylelint

```bash
npm install --save-dev stylelint stylelint-config-property-sort-order-smacss stylelint-config-standard-scss stylelint-order
```

#### React

```bash
npm install --save-dev eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

#### Next.js

```bash
npm install --save-dev @next/eslint-plugin-next eslint-config-next
```

#### Commitlint

```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
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

## Configuration Options

### ESLint

```javascript
import { createConfig } from "@vijayhardaha/dev-config/eslint/next";

export default createConfig({
  prettier: true, // Enable Prettier integration
  importOrder: true, // Enable import ordering
  react: true, // Enable React rules
  a11y: true // Enable accessibility rules
});
```

Available configs:

- `@vijayhardaha/dev-config/eslint` - JavaScript
- `@vijayhardaha/dev-config/eslint/ts` - TypeScript
- `@vijayhardaha/dev-config/eslint/react` - React + TypeScript
- `@vijayhardaha/dev-config/eslint/next` - Next.js + React + TypeScript

## Scripts

| Command                | Description            |
| ---------------------- | ---------------------- |
| `npm run lint`         | Run ESLint             |
| `npm run lint:fix`     | Auto-fix ESLint issues |
| `npm run format`       | Format with Prettier   |
| `npm run format:check` | Check formatting       |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
