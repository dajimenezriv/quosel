import postgres from 'postgres';
import { env } from '../src/env.ts';

const { hostname } = new URL(env.DATABASE_URL);
const localHosts = new Set(['localhost', '127.0.0.1', '::1']);

if (!localHosts.has(hostname)) {
  throw new Error(`Refusing to reset non-local database (host: ${hostname})`);
}

const sql = postgres(env.DATABASE_URL, { prepare: false });

await sql.unsafe(`
  DROP SCHEMA IF EXISTS public CASCADE;
  DROP SCHEMA IF EXISTS drizzle CASCADE;
  CREATE SCHEMA public;
`);
await sql.end();

console.log(`Reset schema on ${hostname}`);
