import { createMiddleware } from 'hono/factory';
import { ApiError } from '../errors';
import type { AuthVariables } from './auth';

interface Options {
  limit: number;
  windowMs: number;
}

export function rateLimit({ limit, windowMs }: Options) {
  const windows = new Map<string, { count: number; resetAt: number }>();

  return createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
    const userId = c.get('userId');
    const now = Date.now();

    const window = windows.get(userId);
    if (!window || window.resetAt <= now) {
      windows.set(userId, { count: 1, resetAt: now + windowMs });
    } else if (window.count >= limit) {
      throw new ApiError(429, 'Too many requests');
    } else {
      window.count += 1;
    }

    await next();
  });
}
