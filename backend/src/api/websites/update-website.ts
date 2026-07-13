import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { R2 } from '@/infra/cloudflare/r2';
import type { Prisma } from '@/infra/postgres/prisma/client';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, buildSiteFiles, stylesSchema, type TemplateData } from '@quosel/core/templates';

const BodySchema = z
  .object({
    name: z.string().optional(),
    context: z.string(),
    blocks: blocksSchema,
    styles: stylesSchema,
  })
  .openapi('UpdateWebsite');

export const updateWebsiteRoute = createRoute({
  method: 'put',
  path: '/{websiteId}',
  middleware: [requireAuth],
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
  const userId = c.get('userId');
  const websiteId = c.req.param('websiteId');
  const { publish } = c.req.valid('query');
  const { name, context, blocks, styles } = c.req.valid('json');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const data: Prisma.WebsiteUpdateInput = { name, context, blocks, styles };

  if (publish) data.publishedAt = new Date();

  await Websites.update(websiteId, data);

  if (publish) {
    const { slug, domain } = website;
    const data: TemplateData = { blocks, styles, domain };
    const files = buildSiteFiles(data).map(({ path, content, contentType }) => ({
      key: `websites/${slug}/${path}`,
      file: new File([content], 'file', { type: contentType }),
    }));

    const liveKeys = new Set<string>(files.map(({ key }) => key));
    const allKeys = await R2.list(`websites/${slug}/`);
    const stale = allKeys.filter((key) => !liveKeys.has(key));

    await Promise.all([R2.uploadMany(files), R2.deleteMany(stale)]);
  }

  return c.body(null, 204);
};
