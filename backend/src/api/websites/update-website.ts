import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { R2 } from '@/infra/cloudflare/r2';
import type { Prisma } from '@/infra/postgres/prisma/client';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, renderTemplate, stylesSchema } from '@quosel/core/templates';

const BodySchema = z.object({
  name: z.string().optional(),
  slug: z.string(),
  context: z.string(),
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

export const updateWebsite: RouteHandler<typeof updateWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const websiteId = c.req.param('websiteId');

  // Website available for all users in production, we don't want to allow update it
  if (websiteId === '9acafda9-c93c-4a78-9351-44b0367cc4c9') {
    return c.body(null, 204);
  }

  const { publish } = c.req.valid('query');
  const { name, slug, context, blocks, styles } = c.req.valid('json');
  // TODO: we are not checking if the website belongs to the user

  const website = await Websites.getById(websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const data: Prisma.WebsiteUpdateInput = { name, slug, context, blocks, styles };

  if (publish) data.publishedAt = new Date();

  await Websites.update(websiteId, data);

  if (publish) {
    const html = renderTemplate({ blocks, styles });
    const file = new File([html], 'index.html', { type: 'text/html' });
    await R2.upload(`websites/${slug}.html`, file);
  }

  return c.body(null, 204);
};
