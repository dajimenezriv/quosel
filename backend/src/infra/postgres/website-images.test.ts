import { createMockImage, createMockUser } from '@/tests/postgres.helper.test';
import { prisma } from './client';
import { WebsiteImages } from './website-images';

describe('website-images', async () => {
  const { id: userId } = await createMockUser();

  beforeEach(async () => {
    await prisma.websiteImage.deleteMany({ where: { userId } });
  });

  describe('getUrl', () => {
    it('should join R2 public url and key', () => {
      // When
      const url = WebsiteImages.getUrl('imageId');
      // Then
      expect(url).toBe('https://r2_public_url/images/imageId');
    });
  });

  describe('getById', () => {
    it('should return image if it exists', async () => {
      // Given
      const image = await createMockImage(userId);
      // When
      const found = await WebsiteImages.getById(image.id);
      // Then
      expect(found!.id).toBe(image.id);
    });

    it('should return null if image does not exist', async () => {
      // When
      const found = await WebsiteImages.getById('nonExisting');
      // Then
      expect(found).toBeNull();
    });
  });

  describe('getAllByUserId', () => {
    it('should retrieve all images for a user', async () => {
      // Given
      await createMockImage(userId);
      await createMockImage(userId);
      // When
      const images = await WebsiteImages.getAllByUserId(userId);
      // Then
      expect(images).toHaveLength(2);
    });

    it('should not include images from other user', async () => {
      // Given
      const { id: userId2 } = await createMockUser();
      await createMockImage(userId2);
      // When
      const images = await WebsiteImages.getAllByUserId(userId);
      // Then
      expect(images).toHaveLength(0);
    });
  });

  describe('create', () => {
    it('should create an image', async () => {
      // When
      const image = await WebsiteImages.create({ id: crypto.randomUUID(), sizeBytes: 1024, userId });
      // Then
      expect(image).toBeDefined();
    });

    it('should throw if error', async () => {
      // When
      const image = WebsiteImages.create({ sizeBytes: 1024, userId } as any);
      // Then
      await expect(image).rejects.toThrow('Argument `id` is missing.');
    });
  });

  describe('delete', () => {
    it('should delete the image if it exists', async () => {
      // Given
      const image = await createMockImage(userId);
      // When
      const deleted = await WebsiteImages.delete(userId, image.id);
      // Then
      expect(deleted.id).toBe(image.id);
    });

    it('should throw if image does not exist', async () => {
      // When
      const promise = WebsiteImages.delete(userId, 'nonExisting');
      // Then
      await expect(promise).rejects.toThrow('No record was found for a delete.');
    });
  });
});
