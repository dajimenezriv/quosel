import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { env } from '@/core/env';
import { logger } from '@/core/logger';
import { Users } from '@/infra/postgres/users';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import type Stripe from 'stripe';
import { syncSubscription } from './sync-subscription';
import { stripe } from './utils';

const ResponseSchema = z.object({ received: z.boolean() });

export const webhooksStripeRoute = createRoute({
  method: 'post',
  path: '/webhooks/stripe',
  responses: setupResponses(200, ResponseSchema),
});

export const webhooksStripe: RouteHandler<typeof webhooksStripeRoute, { Variables: AuthVariables }> = async (c) => {
  const sig = c.req.header('stripe-signature');
  if (!sig) throw new ApiError(400, 'No signature');

  const body = await c.req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    throw new ApiError(400, 'Cannot construct stripe webhook event', { error });
  }

  logger.info('Stripe event', { type: event.type });

  switch (event.type) {
    case 'checkout.session.completed': {
      const { subscription } = event.data.object;
      if (!subscription) break;

      const subId = typeof subscription === 'string' ? subscription : subscription.id;
      const sub = await stripe.subscriptions.retrieve(subId);
      await syncSubscription(sub);
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      await syncSubscription(event.data.object);
      break;
    }
    case 'invoice.payment_failed': {
      const { customer } = event.data.object;
      if (!customer) break;

      const customerId = typeof customer === 'string' ? customer : customer.id;
      await Users.updateByStripeCustomerId(customerId, { subscriptionStatus: 'past_due' });
      break;
    }
  }

  return jsonResponse(c, ResponseSchema, { received: true }, 200);
};
