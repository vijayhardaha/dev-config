import { vi } from 'vitest';

// Mock console output to reduce test noise
global.console = { ...console, log: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() };
