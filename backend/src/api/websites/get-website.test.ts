import { app } from '@/app';
import { Websites } from '@/infra/postgres/websites';
import { templateBlocks } from '@/modules/websites/transform-place-to-blocks';
import { deepMocked, expectError, GET_AUTH_REQUEST, mockAuthMiddleware } from '@/tests/utils.helper.test';

vi.mock(import('@/infra/postgres/websites'));

describe('get-website', () => {
  mockAuthMiddleware();

  const getByIdMock = deepMocked(Websites.getById);

  it('should return 401 if session is not provided', async () => {
    // When
    const res = await app.request('/websites/website-id');
    // Then
    await expectError(res, 401, 'Unauthorized');
  });

  it('should return 404 when website is not found', async () => {
    // Given
    getByIdMock.mockResolvedValue(null);
    // When
    const res = await app.request('/websites/website-id', GET_AUTH_REQUEST);
    // Then
    await expectError(res, 404, 'Website not found');
  });

  it('should return 200 with the full website details', async () => {
    // Given
    getByIdMock.mockResolvedValue({
      id: 'website-id',
      userId: 'user-id',
      domain: 'the-golden-spoon-abc12345',
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
      blocks: templateBlocks,
      styles: {},
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
        reviews: [
          {
            id: 'review-id',
            rating: 5,
            text: 'Amazing food!',
            authorName: 'Jane Doe',
            authorPhotoUri: 'https://example.com/photo.jpg',
            publishTime: new Date('2024-01-01T00:00:00.000Z'),
            googleMapsUri: 'https://maps.google.com/review/789',
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
          },
        ],
      },
    });
    // When
    const res = await app.request('/websites/website-id', GET_AUTH_REQUEST);
    // Then
    expect(res.status).toBe(200);
  });
});
