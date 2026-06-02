import type { UserId } from '@/core/types.ts';
import { Sessions } from '@/infra/postgres/sessions.ts';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { ApiError } from '../errors.ts';

export type AuthVariables = {
  userId: UserId;
};

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
  const id = getCookie(c, 'session');
  if (!id) throw new ApiError(401, 'Unauthorized');

  const row = await Sessions.getById(id);
  if (!row) throw new ApiError(401, 'Unauthorized');

  c.set('userId', row.user.id as UserId);
  await next();
});
