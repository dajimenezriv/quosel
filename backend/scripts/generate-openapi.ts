import { writeFileSync } from 'node:fs';
import { app } from '../src/app.ts';

const doc = app.getOpenAPI31Document({
  openapi: '3.1.0',
  info: {
    title: 'Quosel API',
    version: '1.0.0',
  },
});

const outPath = new URL('../openapi.json', import.meta.url);
writeFileSync(outPath, JSON.stringify(doc, undefined, 2) + '\n');
