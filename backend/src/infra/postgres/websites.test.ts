import { createUser } from '@/tests/utils.helper.test';
import { prisma } from './client';
import { Websites, type PlaceInsert, type ReviewInsert } from './websites';

describe('websites', async () => {
  const { userId: userId1 } = await createUser();
  const { userId: userId2 } = await createUser();

  const place: PlaceInsert = {
    googleId: crypto.randomUUID(),
    formattedAddress: '',
    shortFormattedAddress: '',
    googleMapsPhotosUri: '',
    googleMapsPlaceUri: '',
    googleMapsReviewsUri: '',
    internationalPhoneNumber: '',
    latitude: 0,
    longitude: 0,
    name: 'Small Business',
    raw: {},
  };

  const review: ReviewInsert = {
    googleId: crypto.randomUUID(),
    authorName: '',
    authorPhotoUri: '',
    googleMapsUri: '',
    publishTime: new Date(),
    rating: 0,
    text: '',
  };

  it('should work', async () => {
    // Create website for logged user
    // When
    const websiteId = await Websites.create(userId1, place, [review]);
    // Then
    expect(websiteId).toBeDefined();
    const res = await prisma.website.findFirst({ where: { id: websiteId } });
    expect(res!.domain).toContain('small-business-');

    // Create website for non logged user
    // When
    await Websites.create(userId2, place, [review]);

    // Get all websites for a user
    // When
    const websiteRows = await Websites.getAllByUserId(userId1);
    // Then
    expect(websiteRows).toHaveLength(1);

    // Get website for a user
    // When
    const websiteRow = await Websites.getById(userId1, websiteId!);
    // Then
    expect(websiteRow!.id).toBe(websiteId);
  });
});
