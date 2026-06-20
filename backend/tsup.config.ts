import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  // Workspace package exports raw .ts, so it must be bundled.
  noExternal: ['@quosel/core'],
});
