import { resolve } from 'node:path';
import { config } from 'dotenv';
import { defineConfig } from 'vitest/config';

const { parsed: testEnv = {} } = config({ path: resolve(import.meta.dirname, '.env.test') });

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    clearMocks: true,
    env: testEnv,
    globals: true,
    include: ['src/**/*.test.ts'],
    setupFiles: ['tests/setup.helper.test.ts'],
    testTimeout: 5000,
    watch: true,
    coverage: {
      reportOnFailure: true,
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/index.ts'],
    },
  },
});
