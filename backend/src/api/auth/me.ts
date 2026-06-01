import { Sessions } from '@/infra/postgres/sessions.ts';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { getCookie } from 'hono/cookie';
import { jsonResponse } from '../../core/api/json-response.ts';

const UserSchema = z
  .object({
    id: z.string(),
    email: z.string(),
    name: z.string().nullable(),
    picture: z.string().nullable(),
    subscriptionStatus: z.string().nullable(),
    currentPeriodEnd: z.iso.datetime().nullable(),
  })
  .openapi('User');

const MeResponseSchema = z.object({ user: UserSchema.nullable() }).openapi('MeResponse');

export const meRoute = createRoute({
  method: 'get',
  path: '/me',
  responses: {
    200: {
      content: { 'application/json': { schema: MeResponseSchema } },
      description: 'Current user',
    },
  },
});

export const me: RouteHandler<typeof meRoute> = async (c) => {
  const sessionId = getCookie(c, 'session');
  if (!sessionId) return jsonResponse(c, MeResponseSchema, { user: null }, 200);

  const row = await Sessions.getById(sessionId);
  if (!row) return jsonResponse(c, MeResponseSchema, { user: null }, 200);

  const { user } = row;
  return jsonResponse(
    c,
    MeResponseSchema,
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        subscriptionStatus: user.subscriptionStatus,
        currentPeriodEnd: user.currentPeriodEnd?.toISOString() ?? null,
      },
    },
    200,
  );
};
