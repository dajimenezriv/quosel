import { app } from '@/app.ts';
import { Websites } from '@/infra/postgres/websites.ts';
import { expectJson } from '@/tests/utils.helper.test.ts';

vi.mock(import('@/infra/postgres/websites.ts'));

describe('get-website', () => {
  const getByIdMock = vi.mocked(Websites.getById);

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
    reviews: [
      {
        id: 'review-id',
        googleReviewName: 'accounts/123/locations/456/reviews/789',
        rating: '5',
        originalText: 'Amazing food!',
        originalTextLanguageCode: 'en',
        authorDisplayName: 'Jane Doe',
        authorPhotoUri: 'https://example.com/photo.jpg',
        publishTime: new Date('2024-01-01T00:00:00.000Z'),
        googleMapsUri: 'https://maps.google.com/review/789',
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
      },
    ],
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
    images: [
      {
        id: 'image-id',
        url: 'https://images.quosel.com/examples/1.jpg',
        sizeBytes: 0,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
      },
    ],
  };

  it('should return 404 when website is not found', async () => {
    // Given
    getByIdMock.mockResolvedValue(undefined);
    // When
    const res = await app.request('/websites/get-website/website-id');
    // Then
    await expectJson(res, 404, { error: 'Website not found' });
  });

  it('should return 200 with the full website details', async () => {
    // Given
    getByIdMock.mockResolvedValue(website);
    // When
    const res = await app.request('/websites/get-website/website-id');
    // Then
    await expectJson(res, 200, {
      ...website,
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      place: {
        ...place,
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        reviews: [
          {
            ...place.reviews[0],
            publishTime: '2024-01-01T00:00:00.000Z',
            createdAt: '2024-01-01T00:00:00.000Z',
          },
        ],
      },
      images: [
        {
          ...website.images[0],
          createdAt: '2024-01-01T00:00:00.000Z',
        },
      ],
    });
  });
});
