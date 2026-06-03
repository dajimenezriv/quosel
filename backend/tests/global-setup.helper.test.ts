import { execSync } from 'node:child_process';

export function setup() {
  // eslint-disable-next-line sonarjs/no-os-command-from-path
  execSync('prisma migrate reset --force', { stdio: 'inherit' });
}
