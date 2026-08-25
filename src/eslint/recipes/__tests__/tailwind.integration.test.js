/**
 * Integration test for the Tailwind recipe. Lints a real TSX snippet through
 * ESLint with the recipe appended to a base config and verifies the autofix
 * actually rewrites arbitrary classes into theme-scale utilities.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { ESLint } from 'eslint';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('prettier', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual, resolveConfig: vi.fn().mockResolvedValue({}) };
});

/**
 * Lints a TSX snippet through the recipe appended to the base Next config.
 *
 * @param {string} projectDir - Fixture project root.
 * @param {string} code - TSX source code to lint.
 *
 * @returns {Promise<object>} The single lint result for the snippet.
 */
const lintAndFix = async (projectDir, code) => {
  const { createConfig } = await import('../../next.js');
  const { tailwind } = await import('../tailwind.js');

  const base = createConfig({ rules: { 'import-x/order': 'off' } });
  const recipe = await tailwind({ cwd: projectDir, entryPoint: 'src/app/globals.css' });

  const eslint = new ESLint({
    cwd: projectDir,
    overrideConfigFile: true,
    overrideConfig: [...base, recipe],
    fix: true,
  });
  const [result] = await eslint.lintText(code, { filePath: path.join(projectDir, 'src/Button.tsx') });

  return result;
};

describe('eslint/recipes/tailwind integration', () => {
  let projectDir;

  beforeAll(() => {
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-config-recipe-tailwind-int-'));
    fs.writeFileSync(
      path.join(projectDir, 'package.json'),
      JSON.stringify({ name: 'recipe-fixture', private: true, type: 'module' })
    );
    fs.mkdirSync(path.join(projectDir, 'src/app'), { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'src/app/globals.css'), '@import "tailwindcss";\n');
    fs.symlinkSync(path.resolve(process.cwd(), 'node_modules'), path.join(projectDir, 'node_modules'), 'dir');
  });

  afterAll(() => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  it('replaces arbitrary values with theme scale utilities through the recipe', async () => {
    const code = [
      'const Button = () => (',
      '  <div className="aspect-[3/4] max-w-[280px] p-[16px]">Button</div>',
      ');',
      '',
    ].join('\n');

    const result = await lintAndFix(projectDir, code);

    expect(result.output).toContain('aspect-3/4');
    expect(result.output).toContain('max-w-70');
    expect(result.output).toContain('p-4');
  }, 60_000);
});
