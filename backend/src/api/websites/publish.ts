import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, renderTemplate, type WebsiteData } from '@quosel/templates';

export const publishRoute = createRoute({
  method: 'post',
  path: '/render-website/{websiteId}',
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(204),
});

export const publish: RouteHandler<typeof publishRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const websiteId = c.req.param('websiteId');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const blocks = await blocksSchema.parseAsync(website.blocks);

  const data: WebsiteData = {
    place: website.place,
    isDarkMode: true,
    tweakcnThemeKey: 'Claude',
    blocks,
  };

  return c.html(renderTemplate(data));
};
