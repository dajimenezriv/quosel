import { ApiError } from '@/core/api/errors';
import { setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { R2 } from '@/infra/r2/r2';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, renderTemplate, stylesSchema } from '@quosel/templates';

const BodySchema = z.object({
  blocks: blocksSchema,
  styles: stylesSchema,
});

export const updateWebsiteRoute = createRoute({
  method: 'put',
  path: '/{websiteId}',
  request: {
    params: z.object({ websiteId: z.string() }),
    query: z.object({ publish: z.coerce.boolean().optional() }),
    body: {
      content: {
        'application/json': {
          schema: BodySchema,
        },
      },
    },
  },
  responses: setupResponses(204),
});

export const updateWebsite: RouteHandler<typeof updateWebsiteRoute> = async (c) => {
  const websiteId = c.req.param('websiteId');
  const { publish } = c.req.valid('query');
  const { blocks, styles } = c.req.valid('json');

  const website = await Websites.getById(websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  await Websites.update(websiteId, { blocks, styles });

  if (publish) {
    const html = renderTemplate({ blocks, styles });
    const file = new File([html], 'index.html', { type: 'text/html' });
    await R2.upload(`websites/${websiteId}.html`, file);
  }

  return c.body(null, 204);
};
