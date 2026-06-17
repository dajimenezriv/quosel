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

  it('should return the existing customer when it exists', async () => {
    // Given
    deepMocked(Users.getById).mockResolvedValue({ stripeCustomerId: 'existingCustomerId' });
    // When
    const res = await getOrCreateCustomer(userId);
    // Then
    expect(res).toBe('existingCustomerId');
    calls(stripe.customers.create).toStrictEqual([]);
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
});
