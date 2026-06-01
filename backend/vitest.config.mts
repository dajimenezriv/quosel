import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    clearMocks: true,
    globals: true,
    include: ['src/**/*.test.ts'],
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
