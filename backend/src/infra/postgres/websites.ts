import type { UserId } from '@/core/types';
import { slugify } from '@/core/utils';
import { and, eq, type InferInsertModel } from 'drizzle-orm';
import { db } from './client';
import { places, reviews, websiteImages, websites } from './schema';

export type PlaceInsert = InferInsertModel<typeof places>;
export type ReviewInsert = Omit<InferInsertModel<typeof reviews>, 'placeId'>;

export class Websites {
  static async getAllByUserId(userId: UserId) {
    return await db
      .select({
        id: websites.id,
        userId: websites.userId,
        domain: websites.domain,
        template: websites.template,
        texts: websites.texts,
        createdAt: websites.createdAt,
        updatedAt: websites.updatedAt,
        place: places,
      })
      .from(websites)
      .innerJoin(places, eq(websites.placeId, places.id))
      .where(eq(websites.userId, userId));
  }

  static async getById(userId: UserId, websiteId: string) {
    const [websiteRow] = await db
      .select({
        id: websites.id,
        userId: websites.userId,
        domain: websites.domain,
        template: websites.template,
        texts: websites.texts,
        createdAt: websites.createdAt,
        updatedAt: websites.updatedAt,
        place: places,
      })
      .from(websites)
      .innerJoin(places, eq(websites.placeId, places.id))
      .where(and(eq(websites.id, websiteId), eq(websites.userId, userId)));

    if (!websiteRow) return;

    const [reviewRows, imageRows] = await Promise.all([
      db
        .select({
          id: reviews.id,
          rating: reviews.rating,
          text: reviews.text,
          authorName: reviews.authorName,
          authorPhotoUri: reviews.authorPhotoUri,
          publishTime: reviews.publishTime,
          googleMapsUri: reviews.googleMapsUri,
          createdAt: reviews.createdAt,
        })
        .from(reviews)
        .where(eq(reviews.placeId, websiteRow.place.id)),
      db
        .select({
          id: websiteImages.id,
          url: websiteImages.url,
          sizeBytes: websiteImages.sizeBytes,
          createdAt: websiteImages.createdAt,
        })
        .from(websiteImages)
        .where(eq(websiteImages.websiteId, websiteId)),
    ]);

    return {
      ...websiteRow,
      reviews: reviewRows,
      images: imageRows,
    };
  }

  static async create(place: PlaceInsert, placeReviews: ReviewInsert[]) {
    return await db.transaction(async (tx) => {
      const [placeRow] = await tx.insert(places).values(place).returning();
      if (!placeRow) return;

      if (placeReviews.length > 0) {
        await tx.insert(reviews).values(placeReviews.map((r) => ({ ...r, placeId: placeRow.id })));
      }

      const domain = `${slugify(place.name)}-${placeRow.id.slice(0, 8)}`;

      const [websiteRow] = await tx
        .insert(websites)
        .values({ placeId: placeRow.id, userId: place.userId, domain, template: '' })
        .returning();
      if (!websiteRow) return;

      return websiteRow.id;
    });
  }
}
