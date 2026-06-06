import { serve } from '@hono/node-server';
import { app } from './app';
import { env } from './core/env';
import { logger } from './core/logger';

if (env.NODE_ENV === 'development') {
  const { swaggerUI } = await import('@hono/swagger-ui');

  const doc = app.getOpenAPI31Document({
    openapi: '3.1.0',
    info: {
      title: 'Quosel API',
      version: '1.0.0',
    },
  });

  app.doc('/openapi.json', doc);
  app.get('/docs', swaggerUI({ url: '/openapi.json' }));
}

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  logger.info('Server listening', { address: info.address, port: info.port });
});
