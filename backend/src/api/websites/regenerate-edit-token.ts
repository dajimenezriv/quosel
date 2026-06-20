import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const ResponseSchema = z.object({ token: z.string() });

export const regenerateEditTokenRoute = createRoute({
  method: 'post',
  path: '/{websiteId}/regenerate-edit-token',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(200, ResponseSchema),
});

export const regenerateEditToken: RouteHandler<typeof regenerateEditTokenRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const token = await Websites.regenerateEditToken(userId, websiteId);

  return jsonResponse(c, ResponseSchema, { token }, 200);
};
