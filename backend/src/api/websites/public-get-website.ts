import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { type Blocks, type Styles } from '@quosel/core/templates';
import { WebsiteSchema } from './get-website';

export const publicGetWebsiteRoute = createRoute({
  method: 'get',
  path: '/public/{editToken}',
  request: {
    params: z.object({ editToken: z.string() }),
  },
  responses: setupResponses(200, WebsiteSchema),
});

export const publicGetWebsite: RouteHandler<typeof publicGetWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const { editToken } = c.req.valid('param');

  const website = await Websites.getByEditToken(editToken);
  if (!website) throw new ApiError(404, 'Website not found');

  const blocks = website.blocks as Blocks;
  const styles = website.styles as Styles;

  return jsonResponse(c, WebsiteSchema, { ...website, blocks, styles }, 200);
};
