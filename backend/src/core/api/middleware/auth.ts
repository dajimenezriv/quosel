import type { UserId } from '@/core/types';
import { Sessions } from '@/infra/postgres/sessions';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { ApiError } from '../errors';

export type AuthVariables = {
  userId: UserId;
  userEmail: string;
  userSubscriptionStatus: string;
};

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
  const id = getCookie(c, 'session');
  if (!id) throw new ApiError(401, 'Unauthorized');

  const row = await Sessions.getById(id);
  if (!row) throw new ApiError(401, 'Unauthorized');

  c.set('userId', row.user.id as UserId);
  c.set('userEmail', row.user.email);
  c.set('userSubscriptionStatus', row.user.subscriptionStatus);
  await next();
});
