import type { UserId } from '@/core/types';
import { prisma } from './client';
import type { Prisma } from './prisma/client';
import { Users } from './users';

describe('users', () => {
  const googleId = crypto.randomUUID();
  const baseUser: Prisma.UserCreateInput = {
    googleId,
    email: 'users@test.com',
    name: '',
    picture: '',
    subscriptionStatus: '',
    subscriptionPriceId: '',
  };

  afterEach(async () => {
    await prisma.user.delete({ where: { googleId } });
  });

  it('should work', async () => {
    // Create a user
    // When
    const user = await Users.create(baseUser);
    const userId = user.id as UserId;
    // Then
    expect(user?.googleId).toBe(googleId);

    // Retrieve existing user by id
    // When
    let res = await Users.getById(userId);
    // Then
    expect(res!.email).toBe('users@test.com');

    // Retrieve non existing user by google id
    // When
    res = await Users.getById('other' as UserId);
    // Then
    expect(res).toBeNull();

    // Update user
    // When
    res = await Users.update(userId, { stripeCustomerId: 'stripeCustomerId' });
    // Then
    expect(res!.stripeCustomerId).toBe('stripeCustomerId');

    // Update user by stripe customer id
    // When
    res = await Users.updateByStripeCustomerId('stripeCustomerId', { email: 'users_changed@test.com' });
    // Then
    expect(res!.email).toBe('users_changed@test.com');

    // Retrieve existing user by google id
    // When
    res = await Users.getByGoogleId(googleId);
    // Then
    expect(res!.email).toBe('users_changed@test.com');

    // Retrieve non existing user by google id
    // When
    res = await Users.getByGoogleId('other');
    // Then
    expect(res).toBeNull();
  });
});
