import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const ResponseSchema = z.object({ token: z.string() });

export const shareLinkRoute = createRoute({
  method: 'post',
  path: '/{websiteId}/share-link',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(200, ResponseSchema),
});

export const shareLink: RouteHandler<typeof shareLinkRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const token = await Websites.regenerateEditToken(websiteId, userId);
  if (!token) throw new ApiError(404, 'Website not found');

  return jsonResponse(c, ResponseSchema, { token }, 200);
};
