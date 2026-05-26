import { serve } from '@hono/node-server';
import { app } from './app.ts';
import { env } from './core/env.ts';
import { logger } from './core/logger.ts';

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  logger.info('Server listening', { address: info.address, port: info.port });
});
