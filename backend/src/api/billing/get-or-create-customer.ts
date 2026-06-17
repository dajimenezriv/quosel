import type { UserId } from '@/core/types';
import { Users } from '@/infra/postgres/users';
import { stripe } from './utils';

export async function getOrCreateCustomer(userId: UserId) {
  const user = await Users.getById(userId);
  if (!user) throw new Error('User not found');

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: { userId },
  });

  await Users.update(userId, {
    stripeCustomerId: customer.id,
    stripeSubscriptionId: null,
    subscriptionStatus: '',
    subscriptionPriceId: '',
  });

  return customer.id;
}
