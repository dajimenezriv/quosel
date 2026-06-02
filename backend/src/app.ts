import { cors } from 'hono/cors';
import { authRouter } from './api/auth/router';
import { healthRouter } from './api/health/router';
import { websitesRouter } from './api/websites/router';
import { createRouter } from './core/api/create-router';
import { ApiError } from './core/api/errors';
import { requireAuth } from './core/api/middleware/auth';
import { env } from './core/env';
import { logger } from './core/logger';
import { billingRouter } from './routes/billing';

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
    logger.error(error.message, error.extra);
    return c.json({ error: error.message }, error.status);
  }

  logger.error('Unhandled error', { error });
  return c.json({ error: 'Internal Server Error' }, 500);
});

app.route('/', healthRouter);
app.route('/auth', authRouter);
app.route('/', billingRouter);
app.use('/websites/*', requireAuth);
app.route('/websites', websitesRouter);
