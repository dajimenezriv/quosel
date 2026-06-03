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
    // Then
    expect(user?.googleId).toBe(googleId);

    // Retrieve existing user
    // When
    let res = await Users.getByGoogleId(googleId);
    // Then
    expect(res?.googleId).toBe(googleId);

    // Retrieve non existing user
    // When
    res = await Users.getByGoogleId('other');
    // Then
    expect(res).toBeNull();
  });
});
