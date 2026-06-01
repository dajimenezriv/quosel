import { serve } from '@hono/node-server';
import { app } from './app.ts';
import { requireAuth } from './core/api/middleware/auth.ts';
import { requestLogger } from './core/api/middleware/logger.ts';
import { env } from './core/env.ts';
import { logger } from './core/logger.ts';

app.use('*', requestLogger);

app.use('/places/*', requireAuth);

if (env.NODE_ENV === 'development') {
  const { swaggerUI } = await import('@hono/swagger-ui');
  app.get('/docs', swaggerUI({ url: '/openapi.json' }));
}

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  logger.info('Server listening', { address: info.address, port: info.port });
});
