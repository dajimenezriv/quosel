import { serve } from '@hono/node-server';
import { app } from './app.ts';
import { logger } from './core/logger.ts';
import { env } from './env.ts';

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  logger.info('Server listening', { address: info.address, port: info.port });
});
