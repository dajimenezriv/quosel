// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  build: {
    // Inline the small (~7 KB) stylesheet into <head> instead of shipping it
    // as a render-blocking request, removing it from the critical path.
    inlineStylesheets: 'always',
  },
});
