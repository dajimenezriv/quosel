import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const BodySchema = z.object({ name: z.string() });

const ResponseSchema = z.object({ id: z.string() });

export const createWebsiteRoute = createRoute({
  method: 'post',
  path: '/',
  middleware: [requireAuth],
  request: {
    body: {
      content: {
        'application/json': {
          schema: BodySchema,
        },
      },
    },
  },
  responses: setupResponses(201, ResponseSchema),
});

export const createWebsite: RouteHandler<typeof createWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const userSubscriptionStatus = c.get('userSubscriptionStatus');
  const { name } = c.req.valid('json');

  const count = await Websites.countByUserId(userId);

  if (userSubscriptionStatus === 'active') {
    if (count >= 10) {
      throw new ApiError(403, 'You cannot create more websites. Contact hello@quosel.com if you need more.');
    }
  } else {
    if (count >= 1) {
      throw new ApiError(403, 'Upgrade to create more websites.');
    }
  }

  const website = await Websites.create(userId, name);

  return jsonResponse(c, ResponseSchema, { id: website.id }, 201);
};
