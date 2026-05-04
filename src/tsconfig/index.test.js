import { describe, it, expect } from 'vitest';

// Test suite for the TypeScript base configuration file.
describe('tsconfig/index.json', () => {
  // Test that the tsconfig file is valid JSON and exports an object.
  it('should be a valid JSON file', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that the default export is an object (valid JSON object).
    expect(typeof module.default).toBe('object');
  });

  // Test that the tsconfig contains compilerOptions.
  it('should have compilerOptions', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that compilerOptions property exists on the config object.
    expect(module.default.compilerOptions).toBeDefined();

    // Verify that compilerOptions is an object.
    expect(typeof module.default.compilerOptions).toBe('object');
  });

  // Test that the tsconfig has the correct ECMAScript target.
  it('should have correct target', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that the target is set to ES2024 (modern JavaScript).
    expect(module.default.compilerOptions.target).toBe('ES2024');
  });

  // Test that the tsconfig has JSX configured for React.
  it('should have jsx configured', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that JSX is configured to use react-jsx preset.
    expect(module.default.compilerOptions.jsx).toBe('react-jsx');
  });

  // Test that the tsconfig has strict mode enabled.
  it('should have strict mode enabled', async () => {
    // Dynamically import the JSON file with JSON assertion.
    const module = await import('./index.json', { assert: { type: 'json' } });

    // Verify that strict type checking options are enabled.
    expect(module.default.compilerOptions.strict).toBe(true);
  });
});
