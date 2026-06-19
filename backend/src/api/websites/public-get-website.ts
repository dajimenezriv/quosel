import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { clientIp, rateLimit } from '@/core/api/middleware/rate-limit';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, stylesSchema, type Blocks, type Styles } from '@quosel/core/templates';

const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  context: z.string(),
  blocks: blocksSchema,
  styles: stylesSchema,
});

export const publicGetWebsiteRoute = createRoute({
  method: 'get',
  path: '/public/{token}',
  middleware: [rateLimit({ limit: 30, windowMs: 60_000, key: clientIp })],
  request: {
    params: z.object({ token: z.string() }),
  },
  responses: setupResponses(200, ResponseSchema),
});

export const publicGetWebsite: RouteHandler<typeof publicGetWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const { token } = c.req.valid('param');

  const website = await Websites.getByEditToken(token);
  if (!website) throw new ApiError(404, 'Website not found');

  const blocks = website.blocks as Blocks;
  const styles = website.styles as Styles;

  return jsonResponse(c, ResponseSchema, { ...website, blocks, styles }, 200);
};
