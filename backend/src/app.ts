import { cors } from 'hono/cors';
import { authRouter } from './api/auth/router.ts';
import { healthRouter } from './api/health/router.ts';
import { websitesRouter } from './api/websites/router.ts';
import { createRouter } from './core/api/create-router.ts';
import { ApiError, ErrorSchema } from './core/api/errors.ts';
import { jsonResponse } from './core/api/json-response.ts';
import { env } from './core/env.ts';
import { logger } from './core/logger.ts';
import { billingRouter } from './routes/billing.ts';

export const app = createRouter();

app.use(
  '*',
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.onError((error, c) => {
  if (error instanceof ApiError) {
    return jsonResponse(c, ErrorSchema, { error: error.message }, error.status);
  }

  logger.error('Unhandled error', { error });
  return jsonResponse(c, ErrorSchema, { error: 'Internal Server Error' }, 500);
});

app.route('/', healthRouter);
app.route('/auth', authRouter);
app.route('/', billingRouter);
app.route('/websites', websitesRouter);
