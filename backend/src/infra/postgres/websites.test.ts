import { createMockUser } from '@/tests/postgres.helper.test';
import { Websites } from './websites';

describe('websites', () => {
  describe('getAllByUserId', () => {
    it('should return only websites for the given user', async () => {
      // Given
      const { id: userId1 } = await createMockUser();
      const { id: userId2 } = await createMockUser();
      await Websites.create(userId1, 'Website 1');
      await Websites.create(userId1, 'Website 2');
      await Websites.create(userId2, 'Other Website');
      // When
      const websites = await Websites.getAllByUserId(userId1);
      // Then
      expect(websites).toHaveLength(2);
    });

    it('should return empty array if user has no websites', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const websites = await Websites.getAllByUserId(userId);
      // Then
      expect(websites).toStrictEqual([]);
    });
  });

  describe('countByUserId', () => {
    it('should return only websites count for the given user', async () => {
      // Given
      const { id: userId1 } = await createMockUser();
      const { id: userId2 } = await createMockUser();
      await Websites.create(userId1, 'Website 1');
      await Websites.create(userId1, 'Website 2');
      await Websites.create(userId2, 'Other Website');
      // When
      const count = await Websites.countByUserId(userId1);
      // Then
      expect(count).toBe(2);
    });

    it('should return 0 if user has no websites', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const count = await Websites.countByUserId(userId);
      // Then
      expect(count).toBe(0);
    });
  });

  describe('getById', async () => {
    const { id: userId1 } = await createMockUser();
    const { id: userId2 } = await createMockUser();
    const { id: websiteId } = await Websites.create(userId1, 'My Website');

    it('should return website if it exists', async () => {
      // When
      const website = await Websites.getById(userId1, websiteId);
      // Then
      expect(website!.id).toBe(websiteId);
    });

    it('should return null if website does not exist', async () => {
      // When
      const website = await Websites.getById(userId1, 'nonExistingId');
      // Then
      expect(website).toBeNull();
    });

    it('should return null if website belongs to another user', async () => {
      // When
      const website = await Websites.getById(userId2, websiteId);
      // Then
      expect(website).toBeNull();
    });
  });

  describe('create', async () => {
    const { id: userId } = await createMockUser();

    it('should create a website', async () => {
      // When
      const website = await Websites.create(userId, 'My Website');
      // Then
      expect(website.id).toBeDefined();
      expect(website.userId).toBe(userId);
      expect(website.name).toBe('My Website');
      expect(website.slug).toMatch(/^my-website-[0-9a-f]{8}$/);
    });

    it('should throw if name is invalid', async () => {
      // When
      const promise = Websites.create(userId, {} as any);
      // Then
      await expect(promise).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update website fields', async () => {
      // Given
      const { id: userId } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId, 'My Website');
      // When
      const updated = await Websites.update(websiteId, { name: 'Updated Name' });
      // Then
      expect(updated.name).toBe('Updated Name');
    });

    it('should throw error if website does not exist', async () => {
      // When
      const promise = Websites.update('nonExistingId', { name: 'Updated' });
      // Then
      await expect(promise).rejects.toThrow('No record was found for an update.');
    });
  });

  describe('delete', () => {
    it('should delete the website if it belongs to the user', async () => {
      // Given
      const { id: userId } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId, 'My Website');
      // When
      const deleted = await Websites.delete(userId, websiteId);
      // Then
      expect(deleted.id).toBe(websiteId);
      expect(await Websites.getById(userId, websiteId)).toBeNull();
    });

    it('should throw if website does not exist', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const promise = Websites.delete(userId, 'nonExistingId');
      // Then
      await expect(promise).rejects.toThrow('No record was found for a delete.');
    });

    it('should throw if website belongs to another user', async () => {
      // Given
      const { id: userId1 } = await createMockUser();
      const { id: userId2 } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId1, 'My Website');
      // When
      const promise = Websites.delete(userId2, websiteId);
      // Then
      await expect(promise).rejects.toThrow('No record was found for a delete.');
    });
  });
});
