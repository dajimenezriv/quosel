import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { buildSiteFiles, migrateBlocks, type Styles, type TemplateData } from '@quosel/core/templates';
import { strToU8, zipSync } from 'fflate';

export const exportWebsiteRoute = createRoute({
  method: 'get',
  path: '/{websiteId}/export',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: {
    ...setupResponses(200),
    200: {
      content: { 'application/zip': { schema: z.string().openapi({ type: 'string', format: 'binary' }) } },
      description: '',
    },
  },
});

export const exportWebsite: RouteHandler<typeof exportWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const subscriptionStatus = c.get('userSubscriptionStatus');
  const { websiteId } = c.req.valid('param');

  if (subscriptionStatus !== 'active') throw new ApiError(403, 'An active subscription is required');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const blocks = migrateBlocks(website.blocks);
  const styles = website.styles as Styles;
  const data: TemplateData = { blocks, styles, domain: website.domain };

  const files: Record<string, Uint8Array> = {};
  for (const { path, content } of buildSiteFiles(data)) {
    files[path] = strToU8(content);
  }

  const zip = zipSync(files);

  return c.body(zip, 200, {
    'Content-Type': 'application/zip',
    'Content-Disposition': `attachment; filename="${website.slug}.zip"`,
  });
};
