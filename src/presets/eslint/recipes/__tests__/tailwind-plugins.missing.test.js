/**
 * Verifies the plugin loader's fallback path: when the optional Tailwind
 * plugin modules are missing, the loader returns null for each and the
 * catch-block debug notice fires.
 */

import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('eslint-plugin-better-tailwindcss', () => {
  throw new Error('Cannot find module eslint-plugin-better-tailwindcss');
});
vi.mock('eslint-plugin-tailwindcss', () => {
  throw new Error('Cannot find module eslint-plugin-tailwindcss');
});

const { loadTailwindPlugins } = await import('../tailwind-plugins.js');

describe('loadTailwindPlugins with both plugins missing', () => {
  let debugSpy;

  beforeAll(() => {
    process.env.DEBUG = 'eslint';
    debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
  });

  afterAll(() => {
    debugSpy.mockRestore();
    delete process.env.DEBUG;
  });

  it('returns null for both plugins', async () => {
    const result = await loadTailwindPlugins();

    expect(result.better).toBeNull();
    expect(result.core).toBeNull();
  });

  it('logs a debug notice for each missing plugin', async () => {
    debugSpy.mockClear();
    await loadTailwindPlugins();

    const calls = debugSpy.mock.calls.flat().map(String);
    expect(calls.some((message) => message.includes('eslint-plugin-better-tailwindcss'))).toBe(true);
    expect(calls.some((message) => message.includes('eslint-plugin-tailwindcss'))).toBe(true);
  });

  it('logs the notice when DEBUG is "*"', async () => {
    process.env.DEBUG = '*';
    debugSpy.mockClear();
    await loadTailwindPlugins();

    const calls = debugSpy.mock.calls.flat().map(String);
    expect(calls.some((message) => message.includes('eslint-plugin-better-tailwindcss'))).toBe(true);
  });
});

describe('loadTailwindPlugins with no plugins installed and DEBUG unset', () => {
  it('does not log when DEBUG is not set', async () => {
    delete process.env.DEBUG;
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    debugSpy.mockClear();

    await loadTailwindPlugins();

    expect(debugSpy).not.toHaveBeenCalled();

    debugSpy.mockRestore();
  });
});
