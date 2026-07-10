import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { logger } from '@/core/logger';
import { KV } from '@/infra/cloudflare/kv';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

// The host the customer points at us with a CNAME. It must be a subdomain (e.g.
// www.example.com), never a bare apex (example.com): an apex can't hold a CNAME,
// so there'd be nothing to point at customers.quosel.app. We store and key KV on
// this exact host so it matches the Host header the worker sees. At least three
// dot-separated labels, each a run of letters/digits/hyphens that neither starts
// nor ends with a hyphen.
function isSubdomainHost(value: string): boolean {
  if (value.length > 253) return false;
  const labels = value.split('.');
  if (labels.length < 3) return false;
  return labels.every((label) => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(label));
}

const BodySchema = z
  .object({
    domain: z
      .string()
      .trim()
      .toLowerCase()
      // Be lenient with input: reduce "https://example.com/" to the bare host.
      .transform((value) => {
        const withoutScheme = value.replace(/^https?:\/\//, '');
        const path = withoutScheme.indexOf('/');
        return path === -1 ? withoutScheme : withoutScheme.slice(0, path);
      })
      .refine(isSubdomainHost, {
        message: "Enter a subdomain like www.example.com (a bare domain such as example.com can't point to us with a CNAME)",
      })
      .refine((host) => !host.endsWith('quosel.app') && !host.endsWith('quosel.com'), { message: 'That domain is reserved' }),
  })
  .openapi('SetWebsiteDomain');

export const setWebsiteDomainRoute = createRoute({
  method: 'put',
  path: '/{websiteId}/domain',
  middleware: [requireAuth],
  request: {
    params: z.object({ websiteId: z.string() }),
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

export const setWebsiteDomain: RouteHandler<typeof setWebsiteDomainRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const websiteId = c.req.param('websiteId');
  const { domain: host } = c.req.valid('json');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  await Websites.update(websiteId, { domain: `https://${host}` });

  logger.info('Add slug to workers KV', {
    host,
    slug: website.slug,
    oldDomain: website.domain,
  });

  await KV.put(host, website.slug);

  // Drop the previous custom mapping if the host changed.
  // Default domains have no KV entry.
  const wasDefault = website.domain === Websites.defaultDomain(website.slug);
  const previousHost = website.domain.replace(/^https?:\/\//, '');
  if (!wasDefault && previousHost !== host) await KV.delete(previousHost);

  return c.body(null, 204);
};
