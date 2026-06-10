import { createMockUser } from '@/tests/postgres.helper.test';
import { Sessions } from './sessions';

describe('sessions', async () => {
  const { id: userId } = await createMockUser();

  describe('getById', () => {
    it('should return session if it exists and is not expired', async () => {
      // Given
      const id = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await Sessions.create({ id, userId, expiresAt });
      // When
      const session = await Sessions.getById(id);
      // Then
      expect(session!.id).toBe(id);
    });

    it('should return null if session is expired', async () => {
      // Given
      const id = crypto.randomUUID();
      const expiresAt = new Date(Date.now() - 1000);
      await Sessions.create({ id, userId, expiresAt });
      // When
      const session = await Sessions.getById(id);
      // Then
      expect(session).toBeNull();
    });

    it('should return null if session does not exist', async () => {
      // When
      const session = await Sessions.getById('nonExistingId');
      // Then
      expect(session).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a session', async () => {
      // Given
      const id = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      // When
      await Sessions.create({ id, userId, expiresAt });
      // Then
      const session = await Sessions.getById(id);
      expect(session!.id).toBe(id);
    });

    it('should throw if error', async () => {
      // When
      const promise = Sessions.create({ userId } as any);
      // Then
      await expect(promise).rejects.toThrow('Argument `id` is missing.');
    });
  });

  describe('deleteById', () => {
    it('should delete the session if it exists', async () => {
      // Given
      const id = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
      await Sessions.create({ id, userId, expiresAt });
      // When
      await Sessions.deleteById(id);
      // Then
      const session = await Sessions.getById(id);
      expect(session).toBeNull();
    });

    it('should not throw if session does not exist', async () => {
      // Given
      const id = 'nonExistingId';
      // When
      await Sessions.deleteById(id);
      // Then
      const session = await Sessions.getById(id);
      expect(session).toBeNull();
    });
  });
});
