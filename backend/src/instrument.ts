import * as Sentry from '@sentry/hono/node';
import { app } from './app';
import { env } from './core/env';

if (env.NODE_ENV === 'development') {
  Sentry.init({ dsn: env.SENTRY_DSN });

  app.use(Sentry.sentry(app));
}
