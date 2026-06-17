import { Users } from '@/infra/postgres/users';
import { calls } from '@/tests/utils.helper.test';
import type Stripe from 'stripe';
import { syncSubscription } from './sync-subscription';

vi.mock(import('@/infra/postgres/users'));

function makeSub(overrides: Partial<Stripe.Subscription> = {}): Stripe.Subscription {
  return {
    id: 'sub_1',
    customer: 'cus_1',
    status: 'active',
    items: { data: [{ price: { id: 'price_1' } }] },
    ...overrides,
  } as unknown as Stripe.Subscription;
}

describe('syncSubscription', () => {
  it('should sync using the customer id when customer is a string', async () => {
    // When
    await syncSubscription(makeSub());
    // Then
    calls(Users.updateByStripeCustomerId).toStrictEqual([
      'cus_1',
      {
        stripeSubscriptionId: 'sub_1',
        subscriptionStatus: 'active',
        subscriptionPriceId: 'price_1',
      },
    ]);
  });

  it('should use customer.id when the customer is expanded', async () => {
    // When
    await syncSubscription(makeSub({ customer: { id: 'cus_obj' } as Stripe.Customer }));
    // Then
    calls(Users.updateByStripeCustomerId).toStrictEqual([
      'cus_obj',
      {
        stripeSubscriptionId: 'sub_1',
        subscriptionStatus: 'active',
        subscriptionPriceId: 'price_1',
      },
    ]);
  });

  it('should default priceId to "" when there are no items', async () => {
    // When
    await syncSubscription(makeSub({ items: { data: [] } as unknown as Stripe.ApiList<Stripe.SubscriptionItem> }));
    // Then
    calls(Users.updateByStripeCustomerId).toStrictEqual([
      'cus_1',
      {
        stripeSubscriptionId: 'sub_1',
        subscriptionStatus: 'active',
        subscriptionPriceId: '',
      },
    ]);
  });
});
