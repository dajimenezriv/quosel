import { logger } from '@/core/logger';
import { Users } from '@/infra/postgres/users';
import type Stripe from 'stripe';

export async function syncSubscription(sub: Stripe.Subscription) {
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id;

  const item = sub.items.data[0];
  const priceId = item?.price.id ?? '';
  const periodEnd = item?.current_period_end;
  const currentPeriodEnd = periodEnd ? new Date(periodEnd * 1000) : null;
  const cancelAt = sub.cancel_at ? new Date(sub.cancel_at * 1000) : null;

  logger.info('Stripe sync subscription', {
    customerId,
    subId: sub.id,
    status: sub.status,
    priceId,
    currentPeriodEnd,
    cancelAt,
  });

  await Users.updateByStripeCustomerId(customerId, {
    stripeSubscriptionId: sub.id,
    subscriptionStatus: sub.status,
    subscriptionPriceId: priceId,
    currentPeriodEnd,
    subscriptionCancelAt: cancelAt,
  });
}
