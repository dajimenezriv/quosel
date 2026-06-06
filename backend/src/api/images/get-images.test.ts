import { app } from '@/app';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { deepMocked, expectError, expectJson, GET_AUTH_REQUEST, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/website-images'));

describe('get-images', () => {
  mockAuthMiddleware();

  const getAllByUserIdMock = deepMocked(WebsiteImages.getAllByUserId);

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/images');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 200 with an empty array when user has no images', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([]);
    // When
    const res = await app.request('/images', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { images: [] });
  });

  it('should return 200 with the list of images', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([
      {
        id: 'imageId',
        userId: 'userId',
        websiteId: 'websiteId',
        sizeBytes: 1024,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
      },
    ]);
    // When
    const res = await app.request('/images', GET_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(200);
  });
});
