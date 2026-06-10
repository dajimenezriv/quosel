import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, stylesSchema, type Blocks, type Styles } from '@quosel/templates';

const ResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  domain: z.string().nullable(),
  blocks: blocksSchema,
  styles: stylesSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const getWebsiteRoute = createRoute({
  method: 'get',
  path: '/{websiteId}',
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(200, ResponseSchema),
});

export const getWebsite: RouteHandler<typeof getWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const blocks = website.blocks as Blocks;
  const styles = website.styles as Styles;

  return jsonResponse(c, ResponseSchema, { ...website, blocks, styles }, 200);
};
