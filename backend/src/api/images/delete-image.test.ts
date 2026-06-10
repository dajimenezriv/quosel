import { app } from '@/app';
import { R2 } from '@/infra/cloudflare/r2';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { calls, deepMocked, DELETE_AUTH_REQUEST, expectError, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/website-images'));
vi.mock(import('@/infra/cloudflare/r2'));

describe('delete-image', () => {
  mockAuthMiddleware();

  const deleteMock = deepMocked(WebsiteImages.delete);

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/images/imageId', { method: 'DELETE' });
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 204 when image is deleted', async () => {
    // Given
    deleteMock.mockResolvedValue({ id: 'imageId' });
    // When
    const res = await app.request('/images/imageId', DELETE_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(204);
    calls(R2.delete).toBe('images/imageId');
  });
});
