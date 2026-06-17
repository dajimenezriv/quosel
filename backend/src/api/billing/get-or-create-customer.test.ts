import type { UserId } from '@/core/types';
import { Users } from '@/infra/postgres/users';
import { calls, deepMocked } from '@/tests/utils.helper.test';
import { getOrCreateCustomer } from './get-or-create-customer';
import { stripe } from './utils';

vi.mock(import('@/infra/postgres/users'));
vi.mock(import('./utils'));

const userId = 'userId' as UserId;

describe('getOrCreateCustomer', () => {
  beforeEach(() => {
    deepMocked(Users.getById).mockResolvedValue({ email: 'user@mail.com', name: 'name', stripeCustomerId: null });
    deepMocked(stripe.customers.create).mockResolvedValue({ id: 'newCustomerId' });
  });

  it('should throw when the user does not exist', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue(null);
    // When
    const promise = getOrCreateCustomer(userId);
    // Then
    await expect(promise).rejects.toThrow('User not found');
  });

  it('should return the existing customer when it is not deleted', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue({ stripeCustomerId: 'existingCustomerId' });
    deepMocked(stripe.customers.retrieve).mockResolvedValue({ id: 'existingCustomerId' });
    // When
    const res = await getOrCreateCustomer(userId);
    // Then
    expect(res).toBe('existingCustomerId');
    calls(stripe.customers.create).toStrictEqual([]);
  });

  it('should not update the user when reusing an existing customer', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue({ stripeCustomerId: 'existingCustomerId' });
    deepMocked(stripe.customers.retrieve).mockResolvedValue({ id: 'existingCustomerId' });
    // When
    await getOrCreateCustomer(userId);
    // Then
    calls(Users.update).toStrictEqual([]);
  });

  it('should create a new customer when the user has none', async () => {
    // When
    const res = await getOrCreateCustomer(userId);
    // Then
    expect(res).toBe('newCustomerId');
    calls(stripe.customers.create).toStrictEqual({ email: 'user@mail.com', name: 'name', metadata: { userId } });
    calls(Users.update).toStrictEqual([
      userId,
      {
        stripeCustomerId: 'newCustomerId',
        stripeSubscriptionId: null,
        subscriptionStatus: '',
        subscriptionPriceId: '',
      },
    ]);
  });

  it('should create a new customer when the existing one is deleted', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue({ stripeCustomerId: 'deletedCustomerId' });
    deepMocked(stripe.customers.retrieve).mockResolvedValue({ deleted: true });
    // When
    const res = await getOrCreateCustomer(userId);
    // Then
    expect(res).toBe('newCustomerId');
  });

  it('should create a new customer when the existing one is missing in Stripe', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue({ stripeCustomerId: 'missingCustomerId' });
    vi.mocked(stripe.customers.retrieve).mockRejectedValue({ code: 'resource_missing' });
    // When
    const res = await getOrCreateCustomer(userId);
    // Then
    expect(res).toBe('newCustomerId');
  });

  it('should rethrow unexpected errors from Stripe', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue({ stripeCustomerId: 'existingCustomerId' });
    vi.mocked(stripe.customers.retrieve).mockRejectedValue({ code: 'api_error' });
    // When
    const promise = getOrCreateCustomer(userId);
    // Then
    await expect(promise).rejects.toEqual({ code: 'api_error' });
  });
});
