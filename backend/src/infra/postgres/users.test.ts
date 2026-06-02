import { eq } from 'drizzle-orm';
import { db } from './client';
import { users } from './schema';
import { Users } from './users';

describe('users', () => {
  const googleId = crypto.randomUUID();
  const baseUser = {
    googleId,
    email: 'users@test.com',
    name: '',
    picture: '',
    subscriptionStatus: '',
    subscriptionPriceId: '',
  };

  afterEach(async () => {
    await db.delete(users).where(eq(users.googleId, googleId));
  });

  it('should work', async () => {
    // Create a user
    // When
    let res = await Users.create(baseUser);
    // Then
    expect(res?.googleId).toBe(googleId);

    // Retrieve existing user
    // When
    res = await Users.getByGoogleId(googleId);
    // Then
    expect(res?.googleId).toBe(googleId);

    // Retrieve non existing user
    // When
    res = await Users.getByGoogleId('other');
    // Then
    expect(res).toBeUndefined();
  });
});
