import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { ESLint } from 'eslint';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

/**
 * Lints and fixes a TSX snippet against the Next.js config inside the temp
 * fixture project.
 *
 * @param {object} projectDir - Fixture project root.
 * @param {object} module - Imported next.js module.
 * @param {string} code - TSX source code to lint.
 * @param {object} [options] - createConfig options.
 *
 * @returns {Promise<object>} The single lint result for the snippet.
 */
const lintAndFix = async (projectDir, module, code, options = {}) => {
  const config = module.createConfig({
    settings: {
      'better-tailwindcss': { entryPoint: 'src/app/globals.css' },
      tailwindcss: { cssConfigPath: 'src/app/globals.css' },
    },
    ...options,
  });
  const eslint = new ESLint({ cwd: projectDir, overrideConfigFile: true, overrideConfig: config, fix: true });

  const [result] = await eslint.lintText(code, { filePath: path.join(projectDir, 'src/Button.tsx') });

  return result;
};

// Test suite for Tailwind autofix behavior through the shared config pipeline.
describe('eslint tailwind autofix', () => {
  let projectDir;
  let nextModule;

  beforeAll(async () => {
    nextModule = await import('../next.js');

    // Create an isolated fixture project that mimics a Next.js app layout.
    projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dev-config-tailwind-'));
    fs.writeFileSync(
      path.join(projectDir, 'package.json'),
      JSON.stringify({ name: 'tailwind-fixture', private: true, type: 'module' })
    );
    fs.mkdirSync(path.join(projectDir, 'src/app'), { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'src/app/globals.css'), '@import "tailwindcss";\n');
    fs.symlinkSync(path.resolve(process.cwd(), 'node_modules'), path.join(projectDir, 'node_modules'), 'dir');
  });

  afterAll(() => {
    fs.rmSync(projectDir, { recursive: true, force: true });
  });

  // Test that arbitrary values with theme scale equivalents are replaced.
  it('should replace arbitrary values with theme scale utilities', async () => {
    const code = [
      'const Button = () => (',
      '  <div className="aspect-[3/4] max-w-[280px] p-[16px]">Button</div>',
      ');',
      '',
    ].join('\n');

    const result = await lintAndFix(projectDir, nextModule, code);

    expect(result.output).toContain('aspect-3/4');
    expect(result.output).toContain('max-w-70');
    expect(result.output).toContain('p-4');
  }, 60_000);

  // Test that cn() classes keep their variant prefixes after conversion.
  it('should convert cn() classes while preserving variant prefixes', async () => {
    const code = [
      'const Button = ({ side }) => (',
      `  <div className={cn("data-[side=bottom]:translate-y-[2.5rem]", "dark:hover:translate-x-[-2.5rem]")}>`,
      '    Button',
      '  </div>',
      ');',
      '',
    ].join('\n');

    const result = await lintAndFix(projectDir, nextModule, code, { rules: { 'import-x/order': 'off' } });

    expect(result.output).toContain('data-[side=bottom]:translate-y-10');
    expect(result.output).toContain('dark:hover:-translate-x-10');
  }, 60_000);

  // Test that long class strings are wrapped into readable multi-line groups.
  it('should wrap long class strings into multi-line groups', async () => {
    const longClasses =
      'flex flex-col items-start justify-between gap-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm '
      + 'transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900';
    const code = ['const Card = () => (', `  <div className="${longClasses}">Card</div>`, ');', ''].join('\n');

    const result = await lintAndFix(projectDir, nextModule, code);

    expect(result.output).toMatch(/className="\n\s+flex/);
  }, 60_000);

  // Test that disabling the tailwind option leaves class strings untouched.
  it('should not touch class strings when tailwind option is false', async () => {
    const code = [
      'const Button = () => (',
      '  <div className="aspect-[3/4] max-w-[280px] p-[16px]">Button</div>',
      ');',
      '',
    ].join('\n');

    const result = await lintAndFix(projectDir, nextModule, code, { tailwind: false });

    // Verify that no fixes were applied and the arbitrary classes remain.
    expect(result.output).toBeUndefined();
    expect(result.source).toContain('aspect-[3/4]');

    // Verify that no Tailwind rule contributed messages.
    const tailwindMessages = result.messages.filter(
      (message) => message.ruleId?.startsWith('better-tailwindcss/') || message.ruleId?.startsWith('tailwindcss/')
    );
    expect(tailwindMessages).toHaveLength(0);
  }, 60_000);
});
