import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      '@quosel/templates': fileURLToPath(new URL('../templates/src/index.ts', import.meta.url)),
    },
  },
  server: {
    fs: { allow: ['..'] },
  },
});
