import { eq } from 'drizzle-orm';
import { db } from './client';
import { users } from './schema';
import { Sessions } from './sessions';

describe('sessions', () => {
  let userId: string;
  const googleId = crypto.randomUUID();

  beforeEach(async () => {
    const [user] = await db
      .insert(users)
      .values({
        googleId,
        email: 'sessions@test.com',
        name: '',
        picture: '',
        subscriptionStatus: '',
        subscriptionPriceId: '',
      })
      .returning();
    userId = user!.id;
  });

  afterEach(async () => {
    await db.delete(users).where(eq(users.googleId, googleId));
  });

  it('should work', async () => {
    // Create expired session
    // Given
    let id = crypto.randomUUID();
    let expiresAt = new Date(Date.now() - 1000);
    // When
    await Sessions.create({ id, userId, expiresAt });
    // Then
    let res = await Sessions.getById(id);
    expect(res).toBeUndefined();

    // Create working session
    // Given
    id = crypto.randomUUID();
    expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    // When
    await Sessions.create({ id, userId, expiresAt });
    // Then
    res = await Sessions.getById(id);
    expect(res?.session.id).toBe(id);

    // Delete working session
    // When
    await Sessions.deleteById(id);
    // Then
    res = await Sessions.getById(id);
    expect(res).toBeUndefined();
  });
});
