import { app } from '@/app';
import { R2 } from '@/infra/cloudflare/r2';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { calls, deepMocked, DELETE_AUTH_REQUEST, expectError, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/website-images'));
vi.mock(import('@/infra/cloudflare/r2'));

describe('delete-image', () => {
  mockAuthMiddleware();

  beforeEach(() => {
    deepMocked(WebsiteImages.getById).mockResolvedValue({ id: 'imageId', userId: 'userId' });
  });

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/images/imageId', { method: 'DELETE' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 if image is not found', async () => {
    // Given
    vi.mocked(WebsiteImages.getById).mockResolvedValue(null);
    // When
    const res = await app.request('/images/imageId', DELETE_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Image not found');
    calls(WebsiteImages.delete).toStrictEqual([]);
  });

  it('should return 404 if image belongs to another user', async () => {
    // Given
    deepMocked(WebsiteImages.getById).mockResolvedValue({ id: 'imageId', userId: 'otherUserId' });
    // When
    const res = await app.request('/images/imageId', DELETE_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Image not found');
    calls(WebsiteImages.delete).toStrictEqual([]);
  });

  it('should return 204 when image is deleted', async () => {
    // When
    const res = await app.request('/images/imageId', DELETE_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(204);
    calls(WebsiteImages.delete).toStrictEqual(['userId', 'imageId']);
    calls(R2.delete).toBe('images/imageId');
  });
});
