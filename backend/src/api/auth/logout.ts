import { setupResponses } from '@/core/api/utils.ts';
import { Sessions } from '@/infra/postgres/sessions.ts';
import { createRoute, type RouteHandler } from '@hono/zod-openapi';
import { deleteCookie, getCookie } from 'hono/cookie';

export const logoutRoute = createRoute({
  method: 'post',
  path: '/logout',
  responses: setupResponses(204),
});

export const logout: RouteHandler<typeof logoutRoute> = async (c) => {
  const sessionId = getCookie(c, 'session');
  if (sessionId) await Sessions.deleteById(sessionId);
  deleteCookie(c, 'session', { path: '/' });
  return c.body(null, 204);
};
