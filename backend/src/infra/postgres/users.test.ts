import type { UserId } from '@/core/types';
import { prisma } from '@/infra/postgres/client';
import { createMockUser } from '@/tests/postgres.helper.test';
import { Users } from './users';

describe('users', () => {
  describe('getById', () => {
    it('should return user if it exists', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const res = await Users.getById(userId);
      // Then
      expect(res!.id).toBe(userId);
    });

    it('should return null if not exists', async () => {
      // When
      const res = await Users.getById('userId' as UserId);
      // Then
      expect(res).toBeNull();
    });
  });

  describe('update', () => {
    it('should update user if it exists', async () => {
      // Given
      const { id: userId, name } = await createMockUser();
      // When
      const res = await Users.update(userId, { name: 'newName' });
      // Then
      expect(name).toBe('name');
      expect(res!.name).toBe('newName');
    });

    it('should throw error if user does not exist', async () => {
      // When
      const promise = Users.update('nonExisting' as UserId, { email: 'update@mail.com' });
      // Then
      await expect(promise).rejects.toThrow('No record was found for an update.');
    });
  });

  describe('updateByStripeCustomerId', () => {
    it('should update user if it exists', async () => {
      // Given
      const { stripeCustomerId, name } = await createMockUser();
      // When
      const res = await Users.updateByStripeCustomerId(stripeCustomerId!, { name: 'newName' });
      // Then
      expect(name).toBe('name');
      expect(res!.name).toBe('newName');
    });

    it('should throw error if user does not exist', async () => {
      // When
      const promise = Users.updateByStripeCustomerId('nonExisting', { email: 'update@mail.com' });
      // Then
      await expect(promise).rejects.toThrow('No record was found for an update.');
    });
  });

  describe('createOrUpdate', () => {
    it('should update existing user when googleId exists', async () => {
      // Given
      const { id: userId, googleId, name, ...user } = await createMockUser();
      // When
      const { user: res, created } = await Users.createOrUpdate(googleId, { ...user, name: 'newName' });
      // Then
      expect(name).toBe('name');
      expect(res.name).toBe('newName');
      expect(created).toBe(false);
      expect(await prisma.website.count({ where: { userId } })).toBe(0);
    });

    it('should create a new user and website when googleId does not exist', async () => {
      // Given
      const googleId = crypto.randomUUID();
      // When
      const {
        user: { id: userId },
        created,
      } = await Users.createOrUpdate(googleId, {
        email: crypto.randomUUID(),
        name: '',
        givenName: '',
        familyName: '',
        picture: '',
      });
      // Then
      expect(created).toBe(true);
      expect(await prisma.website.count({ where: { userId } })).toBe(1);
    });
  });
});
