import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, migrateBlocks, stylesSchema, type Styles } from '@quosel/core/templates';

export const WebsiteSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    slug: z.string(),
    domain: z.string(),
    editToken: z.string(),
    context: z.string(),
    blocks: blocksSchema,
    styles: stylesSchema,
    createdAt: z.date(),
    updatedAt: z.date(),
    publishedAt: z.date().nullable(),
  })
  .openapi('Website');

export const getWebsiteRoute = createRoute({
  method: 'get',
  path: '/{websiteId}',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(200, WebsiteSchema),
});

export const getWebsite: RouteHandler<typeof getWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const blocks = migrateBlocks(website.blocks);
  const styles = website.styles as Styles;

  return jsonResponse(c, WebsiteSchema, { ...website, blocks, styles }, 200);
};
