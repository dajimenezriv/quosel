import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { authRouter } from './api/auth/router.ts';
import { ApiError, ErrorSchema } from './api/errors.ts';
import { healthRouter } from './api/health/router.ts';
import { placesRouter } from './api/places/router.ts';
import { env } from './core/env.ts';
import { logger } from './core/logger.ts';
import { jsonResponse } from './core/response.ts';
import { requireAuth } from './middleware/auth.ts';
import { requestLogger } from './middleware/logger.ts';
import { billingRouter } from './routes/billing.ts';

export const openApiDoc = {
  openapi: '3.1.0',
  info: {
    title: 'Quosel API',
    version: '1.0.0',
  },
} as const;

export const app = new OpenAPIHono();

app.use('*', requestLogger);

app.onError((error, c) => {
  if (error instanceof ApiError) {
    return jsonResponse(c, ErrorSchema, { error: error.message }, error.status);
  }

  logger.error('Unhandled error', { error });
  return jsonResponse(c, ErrorSchema, { error: 'Internal Server Error' }, 500);
});

app.use(
  '*',
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.route('/', healthRouter);
app.route('/', authRouter);
app.route('/', billingRouter);

app.use('/places/*', requireAuth);
app.route('/places', placesRouter);

if (env.NODE_ENV === 'development') {
  const { swaggerUI } = await import('@hono/swagger-ui');
  app.doc('/openapi.json', openApiDoc);
  app.get('/docs', swaggerUI({ url: '/openapi.json' }));
}
