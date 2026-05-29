# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.3] - 2026-05-29

### Fixed

- Fix `scopeManager.addGlobals is not a function` crash caused by `eslint-config-next/parser` incompatibility with ESLint 10

### Changed

- Add `stripParser` helper to remove conflicting parsers from builtin configs when `typescript: true`
- Add `commonParser` back to `buildConfigObject` to set `@typescript-eslint/parser` centrally
- Register `react`, `react-hooks`, `@typescript-eslint` as central plugins in `next.js`

## [2.0.2] - 2026-05-29

### Fixed

- Fix "Cannot redefine plugin '@typescript-eslint'" error in ESLint 10 flat config by centralizing plugin registration
- Fix "could not find plugin" error — ESLint 10 requires plugins in the same config object as their rules
- Fix migration guide incorrectly listing `@eslint/compat` as a package to remove

### Changed

- Add `centralPlugins` parameter to `buildConfig` for registering plugins on the main config object
- Add `stripPlugins` helper to remove centrally-registered plugins from individual configs to prevent redefinition
- Use `files.withTs` for React config file patterns instead of hardcoded `**/*.{jsx,tsx}`
- Add export aliases: `./eslint/js`, `./eslint/base`, `./eslint/common`, `./eslint/typescript`, `./eslint/reactjs`, `./eslint/nextjs`, `./package.json`

## [2.0.1] - 2026-05-29

### Changed

- Refactor `buildConfig` into 5 smaller helper functions (`getEnabledPlugins`, `flattenPlugins`, `fixPlugins`, `mergeGlobalIgnores`, `buildConfigObject`)
- Extract JSDoc rule groups into named constants (`JSDOC_REQUIRE_RULES`, `JSDOC_CORRECTNESS_RULES`, `JSDOC_STYLE_RULES`)

## [2.0.0] - 2026-05-29

### Added

- Add ESLint 10 compatibility with native flat config imports
- Add `fixupPluginRules` wrapping for plugin backward compatibility
- Add central `@typescript-eslint` plugin registration to avoid redefinition errors

### Changed

- **Breaking:** Require ESLint >=10 (drop ESLint 8/9 support)
- **Breaking:** Remove FlatCompat — all configs import flat config arrays/objects directly
- **Breaking:** Replace `eslint-plugin-import` with `eslint-plugin-import-x` (ESLint 10 fork)
- Move `typescript-eslint` from dependencies to peerDependencies
- Move `eslint-config-next` from dependencies to devDependencies + optional peer
- Simplify Next.js config — remove redundant conditionalPlugins, filter `next/typescript`
- Rename `import/order` rule to `import-x/order` for `eslint-plugin-import-x`
- Clean up package.json dependency categorization
- Move `@eslint/compat` from dependencies to peerDependencies

### Removed

- **Breaking:** Remove `@eslint/eslintrc` peer dependency (FlatCompat gone)
- **Breaking:** Remove `@eslint/js` peer dependency (unused without FlatCompat)
- **Breaking:** Remove `eslint-config-prettier` peer dependency (bundled in plugin)
- **Breaking:** Remove `eslint-import-resolver-typescript` peer dependency
- Remove `setup()` export (FlatCompat was its only purpose)

## [1.1.4] - 2026-05-22

### Changed

- Update README.md `bun install` flags from `--save-dev` to `--dev`

## [1.1.3] - 2026-05-21

### Added

- Add `.husky/pre-push` hook to run test suite before push
- Add `settings.jsdoc.mode = 'typescript'` when `jsdoc` option is enabled in ESLint config builder
- Add `template` and `example` to `jsdoc/sort-tags` sequence

### Changed

- Reorganize and expand `.gitignore` with additional cache, logs, AI tool, and environment patterns
- Expand `.prettierignore` with caches, temporary files, and static asset directories
- Update `@commitlint/*`, `vitest`, and `stylelint` dev dependencies
- Add `@vijayhardaha/dev-config` as a dev dependency
- Tighten peer ranges for `prettier` and `@prettier/plugin-xml`
- Remove `gc` script from `package.json`
- Refresh lockfile entries in `bun.lock` for dependency updates
- Update Prettier config header command from `npx` to `bunx`
- Set Prettier `xmlWhitespaceSensitivity` from `strict` to `preserve`

### Removed

- Remove `.husky/pre-commit` hook
- Remove redundant JSDoc type annotation from `prettier.config.mjs`

## [1.1.2] - 2026-05-07

### Changed

- Move `vitest` from peerDependencies to devDependencies (internal use only)
- Remove `@next/eslint-plugin-next` and `eslint-config-next` from devDependencies
- Restructure README installation instructions with separated TypeScript setup
- Remove `vitest` from peer dependencies list in AGENTS.md

## [1.1.1] - 2026-05-07

### Added

- Add `@prettier/plugin-xml` for XML file formatting support
- Add XML plugin configuration to Prettier config
- Add `xmlWhitespaceSensitivity: 'strict'` to preserve XML whitespace
- Add XML file overrides (`.xml`, `.xsd`, `.xsl`, `.xslt`) with 2-space indentation
- Add `@prettier/plugin-xml` to peerDependencies
- Add `typescript@^6.0.3` to devDependencies
- Add `ignoreDeprecations: "6.0"` to jsconfig.json for TypeScript 6 support

### Changed

- Update TypeScript peer dependency from `>=5` to `>=6`
- Update stylelint from `^17.10.0` to `^17.11.0`
- Update README.md installation commands from `bun install --save-dev` to `bun add --save-dev`
- Reorder peerDependencies for better readability
- Update format scripts to include `--log-level error` for cleaner output
- Improve `gc` script with interactive prompt for git command execution

### Fixed

- Restore `@next/eslint-plugin-next` in devDependencies (was missing)

## [1.1.0] - 2026-05-04

### Added

- Add comprehensive test suite (18 test files, 55 tests)
- Add tests for ESLint configs (index, typescript, react, next)
- Add tests for ESLint lib modules (setup, files, build-config, ignores, language-options, rules)
- Add tests for Prettier, Commitlint, Next-sitemap, Stylelint configs
- Add tests for JSConfig and TSConfig JSON files
- Add peerDependencies with required and optional packages
- Add peerDependenciesMeta for optional packages
- Update AGENTS.md with accurate architecture and test documentation
- Update README.md with correct install commands using bun
- Add exact versions for eslint, @eslint/js, @next/eslint-plugin-next, eslint-config-next

### Changed

- Restructure ESLint config with modular lib directory
- Sort devDependencies, peerDependencies, peerDependenciesMeta alphabetically
- Move @vitest/coverage-v8 to devDependencies
- Update project config files for bun package manager
- Update husky hooks and release config to use bun
- Add vitest dependencies and scripts
- Clean up unnecessary files

## [1.0.12] - 2026-04-29

### Changed

- Turn off `jsdoc/informative-docs` rule in jsdoc ruleset

### Added

- Add `gc` script to execute `.tmp/git.md` helper commands

## [1.0.11] - 2024-12-09

### Added

- ESLint JSDoc rules support with `jsdoc` option in all eslint configs
- Add `eslint-plugin-jsdoc` as peer dependency
- Extract `tsRules`, `prettierRules`, `importOrderRules` functions from `commonRules`
- Add `jsdocRules` function for public/exported API documentation

### Changed

- Format config files with prettier (jsdoc comment formatting in header separators)
- Update AGENTS.md documentation with jsdoc option

## [1.0.10] - 2024-04-06

### Changed

- Add README.md to package files for npm distribution
- Fix alignment in VS Code settings comment
- Update README dependency installation commands with correct grouping
- Simplify AGENTS code style section and add Git Workflow documentation

## [1.0.9] - 2024-04-05

### Added

- Update commitlint custom rules

## [1.0.8] - 2024-04-03

### Added

- Add overrides for yaml/yml files in Prettier config

### Changed

- Update @typescript-eslint/parser to latest version
- Add author url to package metadata
- Align header docs url with purpose
- Add new paths to gitignore and prettierignore

## [1.0.7] - 2024-04-03

### Fixed

- Fix typescript file name in export

## [1.0.6] - 2024-03-31

### Added

- Update header-max-len to 60 characters

## [1.0.5] - 2024-03-28

### Added

- Configure import/resolver settings with eslint-import-resolver-typescript

## [1.0.4] - 2024-03-28

### Added

- Use async with transform function

## [1.0.3] - 2024-03-28

### Fixed

- Use process.cwd() for tsconfigRootDir in ESLint config

## [1.0.2] - 2024-03-28

### Added

- Add baseUrl option in tsconfig
- Add peerDependenciesMeta for optional dependencies
- Add installation commands for required and optional packages in docs

### Changed

- Remove tsconfig json from exports
- Remove include, exclude & baseUrl options from tsconfig
- Rename tsconfig export & file name
- Remove json ext from exports

### Fixed

- Add rules key in src/commitlint/index.js
- Use rules key for commitlint config
- Restore comments in commitlint config

## [1.0.1] - 2024-03-28

### Changed

- Remove typescript/tsconfig from exports

### Fixed

- Remove comments from json file

## [1.0.0] - 2024-03-28

### Added

- ESLint configs for JavaScript, TypeScript, React, and Next.js
- Commitlint config with conventional commit rules
- Prettier config module with project defaults
- Stylelint config module
- Next-sitemap config module
- TypeScript base config
- JSConfig for IntelliSense
- Main index export for modular config access
- Husky hooks for pre-commit checks
- Editor and IDE config (.editorconfig, VS Code settings)
- MIT license
- README documentation
- AGENTS instructions for AI assistants
- Copilot instructions
- Release-it configuration for automated releases

### Changed

- Remove husky from features list
- Remove eslint symlinks for cleaner structure

[2.0.2]: https://github.com/vijayhardaha/dev-config/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/vijayhardaha/dev-config/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/vijayhardaha/dev-config/compare/v1.1.4...v2.0.0
[1.1.4]: https://github.com/vijayhardaha/dev-config/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/vijayhardaha/dev-config/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/vijayhardaha/dev-config/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/vijayhardaha/dev-config/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/vijayhardaha/dev-config/compare/v1.0.12...v1.1.0
[1.0.12]: https://github.com/vijayhardaha/dev-config/compare/v1.0.11...v1.0.12
[1.0.11]: https://github.com/vijayhardaha/dev-config/compare/v1.0.10...v1.0.11
[1.0.10]: https://github.com/vijayhardaha/dev-config/compare/v1.0.9...v1.0.10
[1.0.9]: https://github.com/vijayhardaha/dev-config/compare/v1.0.8...v1.0.9
[1.0.8]: https://github.com/vijayhardaha/dev-config/compare/v1.0.7...v1.0.8
[1.0.7]: https://github.com/vijayhardaha/dev-config/compare/v1.0.6...v1.0.7
[1.0.6]: https://github.com/vijayhardaha/dev-config/compare/v1.0.5...v1.0.6
[1.0.5]: https://github.com/vijayhardaha/dev-config/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/vijayhardaha/dev-config/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/vijayhardaha/dev-config/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/vijayhardaha/dev-config/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/vijayhardaha/dev-config/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/vijayhardaha/dev-config/releases/tag/v1.0.0
