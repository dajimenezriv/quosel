import { slugify } from '@/core/utils.ts';
import { eq, type InferInsertModel } from 'drizzle-orm';
import { db } from './client.ts';
import type { PlaceInsert, ReviewInsert } from './places.ts';
import { places, reviews, users, websites } from './schema.ts';

const EXAMPLE_PLACE: Omit<PlaceInsert, 'userId'> = {
  googlePlaceId: 'example_place_id',
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
};

const EXAMPLE_REVIEWS: ReviewInsert[] = [
  {
    googleReviewName: 'example_review_1',
    rating: '5.0',
    originalText: 'Absolutely love this place! The food is always fresh and the staff are so friendly. Highly recommend the pasta.',
    originalTextLanguageCode: 'en',
    authorDisplayName: 'Maria Johnson',
    authorPhotoUri: 'https://lh3.googleusercontent.com/a/example1',
    publishTime: new Date('2024-03-15T14:00:00Z'),
    googleMapsUri: 'https://maps.google.com/reviews/example1',
  },
  {
    googleReviewName: 'example_review_2',
    rating: '4.0',
    originalText: 'Great atmosphere and good food. Service was a bit slow on a busy Saturday night but overall a solid experience.',
    originalTextLanguageCode: 'en',
    authorDisplayName: 'James Carter',
    authorPhotoUri: 'https://lh3.googleusercontent.com/a/example2',
    publishTime: new Date('2024-04-22T19:30:00Z'),
    googleMapsUri: 'https://maps.google.com/reviews/example2',
  },
  {
    googleReviewName: 'example_review_3',
    rating: '5.0',
    originalText: 'My favorite spot in town. Cozy interior, amazing desserts, and the owner always remembers our names. A hidden gem!',
    originalTextLanguageCode: 'en',
    authorDisplayName: 'Sofia Nguyen',
    authorPhotoUri: 'https://lh3.googleusercontent.com/a/example3',
    publishTime: new Date('2024-05-10T12:15:00Z'),
    googleMapsUri: 'https://maps.google.com/reviews/example3',
  },
];

export class Users {
  static async getUserByGoogleId(googleId: string) {
    const [res] = await db.select().from(users).where(eq(users.googleId, googleId));
    return res;
  }

  static async createUser(user: InferInsertModel<typeof users>) {
    return await db.transaction(async (tx) => {
      const [newUser] = await tx.insert(users).values(user).returning();
      if (!newUser) return;

      const [newPlace] = await tx
        .insert(places)
        .values({ ...EXAMPLE_PLACE, userId: newUser.id })
        .returning();
      if (!newPlace) return;

      await tx.insert(reviews).values(EXAMPLE_REVIEWS.map((r) => ({ ...r, placeId: newPlace.id })));

      const domain = `${slugify(EXAMPLE_PLACE.displayNameText)}-${newPlace.id.slice(0, 8)}`;
      await tx.insert(websites).values({ placeId: newPlace.id, userId: newUser.id, domain });

      return newUser;
    });
  }
}
