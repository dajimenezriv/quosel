import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { CustomHostnames } from '@/infra/cloudflare/custom-hostnames';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const DomainStatusSchema = z
  .object({
    host: z.string(),
    status: z.union([z.literal('none'), z.literal('pending'), z.literal('active')]),
  })
  .openapi('WebsiteDomainStatus');

export const getWebsiteDomainRoute = createRoute({
  method: 'get',
  path: '/{websiteId}/domain',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(200, DomainStatusSchema),
});

export const getWebsiteDomain: RouteHandler<typeof getWebsiteDomainRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  const host = website.domain.replace(/^https?:\/\//, '');

  if (website.domain === Websites.defaultDomain(website.slug)) {
    return jsonResponse(c, DomainStatusSchema, { host, status: 'none' }, 200);
  }

  const customHostname = await CustomHostnames.getByHostname(host);

  if (!customHostname) {
    return jsonResponse(c, DomainStatusSchema, { host, status: 'pending' }, 200);
  }

  const isActive = customHostname.status === 'active' && customHostname.ssl.status === 'active';

  return jsonResponse(c, DomainStatusSchema, { host, status: isActive ? 'active' : 'pending' }, 200);
};
