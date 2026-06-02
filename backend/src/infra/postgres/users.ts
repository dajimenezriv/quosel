import { slugify } from '@/core/utils';
import { eq, type InferInsertModel } from 'drizzle-orm';
import { db } from './client';
import { places, users, websites } from './schema';
import type { PlaceInsert } from './websites';

const EXAMPLE_PLACE: Omit<PlaceInsert, 'userId'> = {
  googleId: 'example_place_id',
  name: 'The Golden Spoon',
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

export class Users {
  static async getByGoogleId(googleId: string) {
    const [res] = await db.select().from(users).where(eq(users.googleId, googleId));
    return res;
  }

  static async create(user: InferInsertModel<typeof users>) {
    return await db.transaction(async (tx) => {
      const [newUser] = await tx.insert(users).values(user).returning();
      if (!newUser) return;

      const [newPlace] = await tx
        .insert(places)
        .values({ ...EXAMPLE_PLACE, userId: newUser.id })
        .returning();
      if (!newPlace) return;

      const domain = `${slugify(EXAMPLE_PLACE.name)}-${newPlace.id.slice(0, 8)}`;
      await tx.insert(websites).values({ placeId: newPlace.id, userId: newUser.id, domain, template: '' });

      return newUser;
    });
  }
}
