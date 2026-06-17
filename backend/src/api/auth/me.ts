import { Sessions } from '@/infra/postgres/sessions';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { getCookie } from 'hono/cookie';
import { jsonResponse, setupResponses } from '../../core/api/utils';

const UserSchema = z
  .object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    picture: z.string(),
    subscriptionStatus: z.string(),
  })
  .openapi('Me');

const ResponseSchema = z.object({ user: UserSchema.nullable() });

export const meRoute = createRoute({
  method: 'get',
  path: '/me',
  responses: setupResponses(200, ResponseSchema),
});

export const me: RouteHandler<typeof meRoute> = async (c) => {
  const sessionId = getCookie(c, 'session');
  if (!sessionId) return jsonResponse(c, ResponseSchema, { user: null }, 200);

  const row = await Sessions.getById(sessionId);
  if (!row) return jsonResponse(c, ResponseSchema, { user: null }, 200);

  const { user } = row;
  return jsonResponse(c, ResponseSchema, { user }, 200);
};
