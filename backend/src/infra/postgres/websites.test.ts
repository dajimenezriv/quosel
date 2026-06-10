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
      expect(websites).toHaveLength(0);
    });
  });

  describe('getById', () => {
    it('should return website if it exists for the given user', async () => {
      // Given
      const { id: userId } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId, 'My Website');
      // When
      const website = await Websites.getById(userId, websiteId);
      // Then
      expect(website!.id).toBe(websiteId);
    });

    it('should return null if website belongs to a different user', async () => {
      // Given
      const { id: userId1 } = await createMockUser();
      const { id: userId2 } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId1, 'My Website');
      // When
      const website = await Websites.getById(userId2, websiteId);
      // Then
      expect(website).toBeNull();
    });

    it('should return null if website does not exist', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const website = await Websites.getById(userId, 'non-existing-id');
      // Then
      expect(website).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a website', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const website = await Websites.create(userId, 'My Website');
      // Then
      expect(website.id).toBeDefined();
      expect(website.userId).toBe(userId);
      expect(website.name).toBe('My Website');
    });

    it('should create a website', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const promise = Websites.create(userId, {} as any);
      // Then
      await expect(promise).rejects.toThrow('Argument `name`: Invalid value provided.');
    });
  });

  describe('update', () => {
    it('should update website fields', async () => {
      // Given
      const { id: userId } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId, 'My Website');
      // When
      const updated = await Websites.update(userId, websiteId, { name: 'Updated Name' });
      // Then
      expect(updated.name).toBe('Updated Name');
    });

    it('should throw error if website does not exist', async () => {
      // Given
      const { id: userId } = await createMockUser();
      // When
      const promise = Websites.update(userId, 'non-existing-id', { name: 'Updated' });
      // Then
      await expect(promise).rejects.toThrow('No record was found for an update.');
    });

    it('should throw error if website belongs to a different user', async () => {
      // Given
      const { id: userId1 } = await createMockUser();
      const { id: userId2 } = await createMockUser();
      const { id: websiteId } = await Websites.create(userId1, 'My Website');
      // When
      const promise = Websites.update(userId2, websiteId, { name: 'Updated' });
      // Then
      await expect(promise).rejects.toThrow('No record was found for an update.');
    });
  });
});
