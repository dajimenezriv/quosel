import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { rateLimit } from '@/core/api/middleware/rate-limit';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { env } from '@/core/env';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { getOrCreateCustomer } from './get-or-create-customer';
import { stripe } from './utils';

const ResponseSchema = z.object({ url: z.string() });

export const portalRoute = createRoute({
  method: 'post',
  path: '/portal',
  middleware: [requireAuth, rateLimit({ limit: 10, windowMs: 60_000 })],
  responses: setupResponses(200, ResponseSchema),
});

export const portal: RouteHandler<typeof portalRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const customerId = await getOrCreateCustomer(userId);

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${env.FRONTEND_URL}/`,
  });

  return jsonResponse(c, ResponseSchema, { url: session.url }, 200);
};
