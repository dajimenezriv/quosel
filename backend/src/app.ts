import { authRouter } from './api/auth/router.ts';
import { ApiError, ErrorSchema } from './api/errors.ts';
import { healthRouter } from './api/health/router.ts';
import { placesRouter } from './api/places/router.ts';
import { createRouter } from './core/api/create-router.ts';
import { jsonResponse } from './core/api/json-response.ts';
import { logger } from './core/logger.ts';
import { billingRouter } from './routes/billing.ts';

export const app = createRouter();

app.onError((error, c) => {
  if (error instanceof ApiError) {
    return jsonResponse(c, ErrorSchema, { error: error.message }, error.status);
  }

  logger.error('Unhandled error', { error });
  return jsonResponse(c, ErrorSchema, { error: 'Internal Server Error' }, 500);
});

app.route('/', healthRouter);
app.route('/', authRouter);
app.route('/', billingRouter);
app.route('/places', placesRouter);
