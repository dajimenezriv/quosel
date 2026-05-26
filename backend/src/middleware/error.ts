import { createMiddleware } from 'hono/factory';
import { ApiError, ErrorSchema } from '../api/errors.ts';
import { logger } from '../core/logger.ts';
import { jsonResponse } from '../core/response.ts';

export const errorHandler = createMiddleware(async (c, next) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof ApiError) {
      return jsonResponse(c, ErrorSchema, { error: error.message }, error.status);
    }

    logger.error('Unhandled error', { error });
    return jsonResponse(c, ErrorSchema, { error: 'Internal Server Error' }, 500);
  }
});
