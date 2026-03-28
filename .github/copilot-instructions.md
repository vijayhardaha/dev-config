# Copilot Instructions

## Project Purpose

This is a reusable development configuration package for Next.js + TypeScript projects. When assisting with this codebase:

## Code Style

- Use ESM syntax (`import`/`export`)
- Follow flat config format for ESLint (ESLint 9+)
- Add JSDoc comments for all exports
- Use meaningful variable names

## ESLint Configuration

The project uses modular ESLint configs in `src/eslint/`:

- `common.js` - Shared setup (ignores, parser, rules)
- `index.js` - JavaScript files
- `typescript.js` - TypeScript files
- `react.js` - React with TypeScript
- `next.js` - Next.js with React and TypeScript

All configs support `createConfig(options)` with options:

- `prettier` - Enable Prettier integration
- `importOrder` - Enable import ordering rules

## Prettier Rules

- 120 character print width
- 2 space indentation for JS/TS
- 4 space indentation for Python/PHP
- Single quotes for JS/TS
- Trailing commas: es5 for JS/TS, none for JSON/MD

## Git Commit Guidelines

Follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

Header max: 50 chars, Body max: 72 chars/line
