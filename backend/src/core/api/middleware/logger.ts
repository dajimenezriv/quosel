import { createMiddleware } from 'hono/factory';
import { logger } from '../../logger';

export const requestLogger = createMiddleware(async (c, next) => {
  const start = Date.now();
  const { method } = c.req;
  const path = c.req.path;

  logger.info('Request', { method, path });

  await next();

  const ms = Date.now() - start;
  const status = c.res.status;

  logger.info('Response', { method, path, status, ms });
});
