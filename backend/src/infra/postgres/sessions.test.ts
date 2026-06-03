import { createUser } from '@/tests/utils.helper.test';
import { Sessions } from './sessions';

describe('sessions', async () => {
  const { userId } = await createUser();

  it('should work', async () => {
    // Create expired session
    // Given
    let id = crypto.randomUUID();
    let expiresAt = new Date(Date.now() - 1000);
    // When
    await Sessions.create({ id, userId, expiresAt });
    // Then
    let session = await Sessions.getById(id);
    expect(session).toBeNull();

    // Create working session
    // Given
    id = crypto.randomUUID();
    expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    // When
    await Sessions.create({ id, userId, expiresAt });
    // Then
    session = await Sessions.getById(id);
    expect(session!.id).toBe(id);

    // Delete working session
    // When
    await Sessions.deleteById(id);
    // Then
    session = await Sessions.getById(id);
    expect(session).toBeNull();
  });
});
