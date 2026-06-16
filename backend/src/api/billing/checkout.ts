import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { rateLimit } from '@/core/api/middleware/rate-limit';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { env } from '@/core/env';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import { getOrCreateCustomer } from './get-or-create-customer';
import { stripe } from './utils';

const ResponseSchema = z.object({ url: z.string() });

export const checkoutRoute = createRoute({
  method: 'post',
  path: '/checkout',
  middleware: [requireAuth, rateLimit({ limit: 10, windowMs: 60_000 })],
  responses: setupResponses(200, ResponseSchema),
});

export const checkout: RouteHandler<typeof checkoutRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const customerId = await getOrCreateCustomer(userId);

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${env.FRONTEND_URL}/?billing=success`,
    cancel_url: `${env.FRONTEND_URL}/?billing=cancel`,
  });

  if (!session.url) throw new ApiError(500, 'No session url');
  return jsonResponse(c, ResponseSchema, { url: session.url }, 200);
};
