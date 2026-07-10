import { createMockUser, createMockWebsite } from '@/tests/postgres.helper.test';
import { Websites } from './websites';

describe('websites', () => {
  describe('getAllByUserId', () => {
    it('should return only websites for the given user', async () => {
      // Given
      const { id: userId1 } = await createMockUser();
      const { id: userId2 } = await createMockUser();
      await createMockWebsite(userId1);
      await createMockWebsite(userId1);
      await createMockWebsite(userId2);
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
      await createMockWebsite(userId1);
      await createMockWebsite(userId1);
      await createMockWebsite(userId2);
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
    const { id: websiteId } = await createMockWebsite(userId1);

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

  describe('getByEditToken', async () => {
    const { id: userId } = await createMockUser();
    const { id: websiteId, editToken } = await createMockWebsite(userId);

    it('should return website if it exists', async () => {
      // When
      const website = await Websites.getByEditToken(editToken);
      // Then
      expect(website!.id).toBe(websiteId);
    });

    it('should return null if website does not exist', async () => {
      // When
      const website = await Websites.getByEditToken('nonExistingToken');
      // Then
      expect(website).toBeNull();
    });
  });

  describe('create', async () => {
    const { id: userId } = await createMockUser();

    it('should create a website with the given slug and default domain', async () => {
      // When
      const website = await Websites.create(userId, 'Website', crypto.randomUUID());
      // Then
      expect(website.id).toBeDefined();
      expect(website.userId).toBe(userId);
      expect(website.name).toBe('Website');
      expect(website.domain).toContain('.quosel.app');
    });

    it('should throw if slug is duplicated', async () => {
      // Given
      const { slug } = await createMockWebsite(userId);
      // When
      const promise = Websites.create(userId, 'Website', slug);
      // Then
      await expect(promise).rejects.toThrow('That slug is already in use.');
    });

    it('should throw if name is invalid', async () => {
      // When
      const promise = Websites.create(userId, {} as any, 'invalid-name');
      // Then
      await expect(promise).rejects.toThrow('Argument `name`: Invalid value provided.');
    });
  });

  describe('update', async () => {
    const { id: userId } = await createMockUser();
    const { id: websiteId, domain } = await createMockWebsite(userId);

    it('should update website fields', async () => {
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

    it('should throw error if domain is duplicated', async () => {
      // Given
      const { id: websiteId2 } = await createMockWebsite(userId);
      // When
      const promise = Websites.update(websiteId2, { domain });
      // Then
      await expect(promise).rejects.toThrow('That domain is already in use.');
    });
  });

  describe('regenerateEditToken', async () => {
    const { id: userId } = await createMockUser();

    it('should update website fields', async () => {
      // Given
      const { id: websiteId, editToken } = await createMockWebsite(userId);
      // When
      const token = await Websites.regenerateEditToken(userId, websiteId);
      // Then
      expect(token).not.toBe(editToken);
    });

    it('should throw error if website does not exist', async () => {
      // When
      const promise = Websites.regenerateEditToken(userId, 'nonExistingId');
      // Then
      await expect(promise).rejects.toThrow('No record was found for an update.');
    });
  });

  describe('delete', () => {
    it('should delete the website if it belongs to the user', async () => {
      // Given
      const { id: userId } = await createMockUser();
      const { id: websiteId } = await createMockWebsite(userId);
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
      const { id: websiteId } = await createMockWebsite(userId1);
      // When
      const promise = Websites.delete(userId2, websiteId);
      // Then
      await expect(promise).rejects.toThrow('No record was found for a delete.');
    });
  });
});
