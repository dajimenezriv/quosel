import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { R2 } from '@/infra/cloudflare/r2';
import type { Prisma } from '@/infra/postgres/prisma/client';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import {
  blocksSchema,
  renderRobots,
  renderServicePage,
  renderSitemap,
  renderTemplate,
  stylesSchema,
  type TemplateData,
} from '@quosel/core/templates';

const BodySchema = z
  .object({
    name: z.string().optional(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
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
  const { name, slug, context, blocks, styles } = c.req.valid('json');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const data: Prisma.WebsiteUpdateInput = { name, slug, context, blocks, styles };

  if (publish) data.publishedAt = new Date();

  await Websites.update(websiteId, data);

  if (publish) {
    const canonicalUrl = `https://sites.quosel.com/${slug}`;
    const toFile = (content: string, type = 'text/html') => new File([content], 'file', { type });

    const data: TemplateData = { blocks, styles, canonicalUrl };
    const files = [
      { key: `websites/${slug}/index.html`, file: toFile(renderTemplate(data)) },
      ...blocks.pages.map((page) => ({
        key: `websites/${slug}/${page.slug}.html`,
        file: toFile(renderServicePage(data, page)),
      })),
      { key: `websites/${slug}/sitemap.xml`, file: toFile(renderSitemap(data), 'application/xml') },
      { key: `websites/${slug}/robots.txt`, file: toFile(renderRobots(data), 'text/plain') },
    ];

    const liveKeys = new Set<string>(files.map(({ key }) => key));
    const allKeys = await R2.list(`websites/${slug}/`);
    const stale = allKeys.filter((key) => !liveKeys.has(key));

    await Promise.all([R2.uploadMany(files), R2.deleteMany(stale)]);
  }

  return c.body(null, 204);
};
