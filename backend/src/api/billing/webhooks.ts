import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { env } from '@/core/env';
import { Users } from '@/infra/postgres/users';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';
import type Stripe from 'stripe';
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

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const subId = session.subscription;
      if (typeof subId === 'string') {
        const sub = await stripe.subscriptions.retrieve(subId);
        await syncSubscription(sub);
      }
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      await syncSubscription(event.data.object);
      break;
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object;
      const customerId = typeof invoice.customer === 'string' ? invoice.customer : invoice.customer?.id;
      if (customerId) {
        await Users.updateByStripeCustomerId(customerId, { subscriptionStatus: 'past_due' });
      }
      break;
    }
  }

  return jsonResponse(c, ResponseSchema, { received: true }, 200);
};

async function syncSubscription(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;

  const item = sub.items.data[0];
  const periodEnd = item?.current_period_end ?? null;

  await Users.updateByStripeCustomerId(customerId, {
    stripeSubscriptionId: sub.id,
    subscriptionStatus: sub.status,
    subscriptionPriceId: item?.price.id ?? '',
    currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
  });
}
