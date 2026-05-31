import { Sessions } from '@/infra/postgres/sessions.ts';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

export type AuthVariables = {
  userId: string;
};

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
  const id = getCookie(c, 'session');
  if (!id) return c.json({ error: 'unauthorized' }, 401);

  const row = await Sessions.getById(id);
  if (!row) return c.json({ error: 'unauthorized' }, 401);

  c.set('userId', row.user.id);
  await next();
});
