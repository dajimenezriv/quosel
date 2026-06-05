import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { deepMocked, expectError, expectJson, GET_AUTH_REQUEST, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));

describe('get-websites', () => {
  mockAuthMiddleware();

  const getAllByUserIdMock = deepMocked(Websites.getAllByUserId);

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 200 with an empty array when user has no websites', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([]);
    // When
    const res = await app.request('/websites', GET_AUTH_REQUEST);
    // Then
    await expectJson(res, 200, { websites: [] });
  });

  it('should return 200 with the list of websites', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([
      {
        id: 'website-id',
        userId: 'user-id',
        domain: 'the-golden-spoon-abc12345',
        template: 'default',
        texts: [],
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        place: {
          id: 'place-id',
          googleId: 'google-place-id',
          name: 'The Golden Spoon',
          internationalPhoneNumber: '+1 555-123-4567',
          formattedAddress: '123 Main Street, Springfield, IL 62701, USA',
          shortFormattedAddress: '123 Main St, Springfield',
          latitude: 39.7817,
          longitude: -89.6501,
          rating: 4.5,
          userRatingCount: 3,
          googleMapsPlaceUri: 'https://maps.google.com/?cid=example',
          googleMapsReviewsUri: 'https://maps.google.com/?cid=example#reviews',
          googleMapsPhotosUri: 'https://maps.google.com/?cid=example#photos',
          createdAt: new Date('2024-01-01T00:00:00.000Z'),
          updatedAt: new Date('2024-01-01T00:00:00.000Z'),
        },
      },
    ]);
    // When
    const res = await app.request('/websites', GET_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(200);
  });
});
