import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { authRouter } from './api/auth/router';
import { billingRouter } from './api/billing/router';
import { healthRouter } from './api/health/router';
import { imagesRouter } from './api/images/router';
import { websitesRouter } from './api/websites/router';
import { createRouter } from './core/api/create-router';
import { ApiError } from './core/api/errors';
import { requireAuth } from './core/api/middleware/auth';
import { requestLogger } from './core/api/middleware/logger';
import { rateLimit } from './core/api/middleware/rate-limit';
import { env } from './core/env';
import { logger } from './core/logger';

export const app = createRouter();

app.use(secureHeaders());

app.use(
  '*',
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use('*', requestLogger);

app.onError((error, c) => {
  if (error instanceof ApiError) {
    logger.error(error.message, error.extra);
    return c.json({ message: error.message }, error.status);
  }

  logger.error('Unhandled error', { error });
  return c.json({ message: 'Internal Server Error' }, 500);
});

app.route('/', healthRouter);
app.route('/auth', authRouter);

app.use('/billing/portal', requireAuth, rateLimit({ limit: 10, windowMs: 60_000 }));
app.use('/billing/checkout', requireAuth, rateLimit({ limit: 10, windowMs: 60_000 }));
app.route('/billing', billingRouter);

app.use('/websites', requireAuth);
app.route('/websites', websitesRouter);

app.use('/images/*', requireAuth);
app.use('/images/upload', rateLimit({ limit: 10, windowMs: 30_000 }));
app.route('/images', imagesRouter);
