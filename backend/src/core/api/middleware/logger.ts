import { createMiddleware } from 'hono/factory';
import { logger } from '../../logger';

export const requestLogger = createMiddleware(async (c, next) => {
  const start = Date.now();
  const { path, method } = c.req;

  await next();

  const ms = Date.now() - start;
  const status = c.res.status;

  logger.info('Request', { method, path, status, ms });
});
