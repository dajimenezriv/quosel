import { app } from '@/app';
import { Users } from '@/infra/postgres/users';
import { calls, deepMocked, expectError, expectJson } from '@/tests/utils.helper.test';
import type Stripe from 'stripe';
import { syncSubscription } from './sync-subscription';
import { stripe } from './utils';

vi.mock(import('@/infra/postgres/users'));
vi.mock(import('./sync-subscription'));
vi.mock(import('./utils'));

function webhookRequest() {
  return {
    method: 'POST',
    headers: { 'stripe-signature': 'sig', 'Content-Type': 'application/json' },
    body: '{}',
  };
}

function mockEvent(event: Partial<Stripe.Event>) {
  deepMocked(stripe.webhooks.constructEvent).mockReturnValue(event);
}

describe('webhooks', () => {
  beforeEach(() => {
    deepMocked(stripe.subscriptions.retrieve).mockResolvedValue({ id: 'sub_1' });
  });

  it('should return 400 when the signature header is missing', async () => {
    // When
    const res = await app.request('/billing/webhooks/stripe', { method: 'POST', body: '{}' });
    // Then
    await expectError(res, 400, 'No signature');
  });

  it('should return 400 when the event cannot be constructed', async () => {
    // Given
    deepMocked(stripe.webhooks.constructEvent).mockImplementation(() => {
      throw new Error('bad signature');
    });
    // When
    const res = await app.request('/billing/webhooks/stripe', webhookRequest());
    // Then
    await expectError(res, 400, 'Cannot construct stripe webhook event');
  });

  it('should retrieve and sync the subscription on checkout.session.completed', async () => {
    // Given
    mockEvent({ type: 'checkout.session.completed', data: { object: { subscription: 'sub_1' } } } as Partial<Stripe.Event>);
    // When
    const res = await app.request('/billing/webhooks/stripe', webhookRequest());
    // Then
    await expectJson(res, 200, { received: true });
    calls(stripe.subscriptions.retrieve).toStrictEqual('sub_1');
    calls(syncSubscription).toStrictEqual({ id: 'sub_1' });
  });

  it('should not sync when the checkout session has no subscription', async () => {
    // Given
    mockEvent({ type: 'checkout.session.completed', data: { object: { subscription: null } } } as Partial<Stripe.Event>);
    // When
    const res = await app.request('/billing/webhooks/stripe', webhookRequest());
    // Then
    await expectJson(res, 200, { received: true });
    calls(syncSubscription).toStrictEqual([]);
  });

  it('should sync the subscription on customer.subscription.updated', async () => {
    // Given
    mockEvent({ type: 'customer.subscription.updated', data: { object: { id: 'sub_2' } } } as Partial<Stripe.Event>);
    // When
    const res = await app.request('/billing/webhooks/stripe', webhookRequest());
    // Then
    await expectJson(res, 200, { received: true });
    calls(syncSubscription).toStrictEqual({ id: 'sub_2' });
  });

  it('should mark the subscription past_due on invoice.payment_failed', async () => {
    // Given
    mockEvent({ type: 'invoice.payment_failed', data: { object: { customer: 'cus_1' } } } as Partial<Stripe.Event>);
    // When
    const res = await app.request('/billing/webhooks/stripe', webhookRequest());
    // Then
    await expectJson(res, 200, { received: true });
    calls(Users.updateByStripeCustomerId).toStrictEqual(['cus_1', { subscriptionStatus: 'past_due' }]);
  });

  it('should ignore unhandled event types', async () => {
    // Given
    mockEvent({ type: 'customer.created', data: { object: { id: 'cus_1' } } } as Partial<Stripe.Event>);
    // When
    const res = await app.request('/billing/webhooks/stripe', webhookRequest());
    // Then
    await expectJson(res, 200, { received: true });
    calls(syncSubscription).toStrictEqual([]);
    calls(Users.updateByStripeCustomerId).toStrictEqual([]);
  });
});
