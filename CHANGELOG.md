# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
