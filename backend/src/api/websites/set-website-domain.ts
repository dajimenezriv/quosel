import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { logger } from '@/core/logger';
import { KV } from '@/infra/cloudflare/kv';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

// A bare hostname (no scheme, no path): at least two dot-separated labels, each a run of
// letters/digits/hyphens that neither starts nor ends with a hyphen.
function isHost(value: string): boolean {
  if (value.length > 253) return false;
  const labels = value.split('.');
  if (labels.length < 2) return false;
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
      .refine(isHost, { message: 'Enter a valid domain like example.com' })
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
