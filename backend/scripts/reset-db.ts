import { execSync } from 'node:child_process';
import { env } from '../src/core/env';

const { hostname } = new URL(env.DATABASE_URL);
const localHosts = new Set(['localhost', '127.0.0.1', '::1']);

if (!localHosts.has(hostname)) {
  throw new Error(`Refusing to reset non-local database (host: ${hostname})`);
}

// eslint-disable-next-line sonarjs/no-os-command-from-path
execSync('prisma migrate reset --force', { stdio: 'inherit' });
