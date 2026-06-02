import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../../core/env';
import * as schema from './schema';

// `prepare: false` is required when connecting through Supabase's
// transaction-mode pooler (port 6543). Safe to keep for direct connections too.
const queryClient = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(queryClient, { schema });
