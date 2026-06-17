import { logger } from '@/core/logger';
import { Users } from '@/infra/postgres/users';
import type Stripe from 'stripe';

export async function syncSubscription(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;

  const item = sub.items.data[0];
  const priceId = item?.price.id ?? '';

  logger.info('Stripe sync subscription', {
    customerId,
    subId: sub.id,
    status: sub.status,
    priceId,
  });

  await Users.updateByStripeCustomerId(customerId, {
    stripeSubscriptionId: sub.id,
    subscriptionStatus: sub.status,
    subscriptionPriceId: priceId,
  });
}
