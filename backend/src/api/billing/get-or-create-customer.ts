import type { UserId } from '@/core/types';
import { Users } from '@/infra/postgres/users';
import { stripe } from './utils';

export async function getOrCreateCustomer(userId: UserId) {
  const user = await Users.getById(userId);
  if (!user) throw new Error('User not found');

  if (user.stripeCustomerId) {
    try {
      const existing = await stripe.customers.retrieve(user.stripeCustomerId);
      if (!existing.deleted) return user.stripeCustomerId;
    } catch (error) {
      const code = (error as { code?: string })?.code;
      if (code !== 'resource_missing') throw error;
    }
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId: user.id },
  });

  await Users.update(userId, {
    stripeCustomerId: customer.id,
    stripeSubscriptionId: null,
    subscriptionStatus: '',
    subscriptionPriceId: '',
    currentPeriodEnd: null,
  });

  return customer.id;
}
