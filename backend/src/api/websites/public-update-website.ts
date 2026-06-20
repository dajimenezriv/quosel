import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { blocksSchema, stylesSchema } from '@quosel/core/templates';

// Cap the payload so a leaked link cannot be used to write multi-MB junk.
const MAX_BODY_BYTES = 50_000;

const BodySchema = z
  .object({
    name: z.string().optional(),
    context: z.string(),
    blocks: blocksSchema,
    styles: stylesSchema,
  })
  .refine((v) => Buffer.byteLength(JSON.stringify(v), 'utf8') <= MAX_BODY_BYTES, { message: 'Payload too large' })
  .openapi('PublicUpdateWebsite');

export const publicUpdateWebsiteRoute = createRoute({
  method: 'put',
  path: '/public/{editToken}',
  request: {
    params: z.object({ editToken: z.string() }),
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

export const publicUpdateWebsite: RouteHandler<typeof publicUpdateWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const { editToken } = c.req.valid('param');
  const { name, context, blocks, styles } = c.req.valid('json');

  const website = await Websites.getByEditToken(editToken);
  if (!website) throw new ApiError(404, 'Website not found');

  // Website available for all users in production, we don't want to allow update it.
  if (website.id === '9acafda9-c93c-4a78-9351-44b0367cc4c9') {
    throw new ApiError(403, 'Cannot update DEMO site');
  }

  await Websites.update(website.id, { name, context, blocks, styles });

  return c.body(null, 204);
};
