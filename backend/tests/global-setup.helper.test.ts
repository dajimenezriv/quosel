import { env } from '@/core/env';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

export async function setup() {
  const client = postgres(env.DATABASE_URL);
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: 'drizzle' });
  await client.end();
}
