import type { Context } from 'hono';
import { createMiddleware } from 'hono/factory';
import { ApiError } from '../errors';
import type { AuthVariables } from './auth';

interface Options {
  limit: number;
  windowMs: number;
  key?: (c: Context) => string;
}

export function rateLimit({ limit, windowMs, key }: Options) {
  const windows = new Map<string, { count: number; resetAt: number }>();

  return createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
    const id = key ? key(c) : c.get('userId');
    const now = Date.now();

    const window = windows.get(id);
    if (!window || window.resetAt <= now) {
      windows.set(id, { count: 1, resetAt: now + windowMs });
    } else if (window.count >= limit) {
      throw new ApiError(429, 'Too many requests');
    } else {
      window.count += 1;
    }

    await next();
  });
}

export function clientIp(c: Context) {
  return c.req.header('cf-connecting-ip') ?? c.req.header('x-forwarded-for') ?? 'unknown';
}
