import { Sessions } from '@/infra/postgres/sessions.ts';
import { createRoute } from '@hono/zod-openapi';
import type { Context } from 'hono';
import { deleteCookie, getCookie } from 'hono/cookie';

export const logoutRoute = createRoute({
  method: 'post',
  path: '/auth/logout',
  responses: {
    204: {
      description: 'Logged out',
    },
  },
});

export async function logout(c: Context) {
  const sessionId = getCookie(c, 'session');
  if (sessionId) await Sessions.deleteById(sessionId);
  deleteCookie(c, 'session', { path: '/' });
  return c.body(null, 204);
}
