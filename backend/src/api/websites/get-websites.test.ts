import { app } from '@/app.ts';
import { Websites } from '@/infra/postgres/websites.ts';
import { expectJson } from '@/tests/utils.helper.test.ts';

vi.mock(import('@/infra/postgres/websites.ts'));

describe('get-websites', () => {
  const getAllByUserIdMock = vi.mocked(Websites.getAllByUserId);

  it('should return 200 with an empty array when user has no websites', async () => {
    // Given
    getAllByUserIdMock.mockResolvedValue([]);
    // When
    const res = await app.request('/websites/get-websites');
    // Then
    await expectJson(res, 200, { websites: [] });
  });

  it('should return 200 with the list of websites', async () => {
    // Given
    const place = {
      id: 'place-id',
      userId: 'user-id',
      googlePlaceId: 'google-place-id',
      displayNameText: 'The Golden Spoon',
      displayNameLanguageCode: 'en',
      nationalPhoneNumber: '(555) 123-4567',
      internationalPhoneNumber: '+1 555-123-4567',
      formattedAddress: '123 Main Street, Springfield, IL 62701, USA',
      shortFormattedAddress: '123 Main St, Springfield',
      latitude: 39.7817,
      longitude: -89.6501,
      rating: '4.5',
      userRatingCount: 3,
      googleMapsPlaceUri: 'https://maps.google.com/?cid=example',
      googleMapsReviewsUri: 'https://maps.google.com/?cid=example#reviews',
      googleMapsPhotosUri: 'https://maps.google.com/?cid=example#photos',
      raw: null,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
    };
    const website = {
      id: 'website-id',
      userId: 'user-id',
      domain: 'the-golden-spoon-abc12345',
      template: 'default',
      texts: [],
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
      place,
    };
    getAllByUserIdMock.mockResolvedValue([website]);
    // When
    const res = await app.request('/websites/get-websites');
    // Then
    await expectJson(res, 200, {
      websites: [
        {
          ...website,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
          place: {
            ...place,
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z',
          },
        },
      ],
    });
  });
});
