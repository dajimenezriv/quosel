import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { R2 } from '@/infra/cloudflare/r2';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

export const deleteWebsiteRoute = createRoute({
  method: 'delete',
  path: '/{websiteId}',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(204),
});

export const deleteWebsite: RouteHandler<typeof deleteWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(websiteId);
  if (!website || website.userId !== userId) throw new ApiError(404, 'Website not found');

  await Websites.delete(userId, websiteId);

  if (website.publishedAt) await R2.delete(`websites/${websiteId}.html`);

  return c.body(null, 204);
};
