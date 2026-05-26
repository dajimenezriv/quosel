import { OpenAPIHono } from '@hono/zod-openapi';
import { cors } from 'hono/cors';
import { placesRouter } from './api/google-places/router.ts';
import { healthRouter } from './api/health/router.ts';
import { env } from './core/env.ts';
import { requireAuth } from './middleware/auth.ts';
import { requestLogger } from './middleware/logger.ts';
import { authRouter } from './routes/auth.ts';
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
app.route('/', placesRouter);
