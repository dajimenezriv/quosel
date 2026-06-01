import type { UserId } from '@/core/types.ts';
import { and, eq } from 'drizzle-orm';
import { db } from './client.ts';
import { places, reviews, websiteImages, websites } from './schema.ts';

export class Websites {
  static async getByUserId(userId: UserId) {
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
    const [row] = await db
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

    if (!row) return;

    const [placeReviews, images] = await Promise.all([
      db
        .select({
          id: reviews.id,
          googleReviewName: reviews.googleReviewName,
          rating: reviews.rating,
          originalText: reviews.originalText,
          originalTextLanguageCode: reviews.originalTextLanguageCode,
          authorDisplayName: reviews.authorDisplayName,
          authorPhotoUri: reviews.authorPhotoUri,
          publishTime: reviews.publishTime,
          googleMapsUri: reviews.googleMapsUri,
          createdAt: reviews.createdAt,
        })
        .from(reviews)
        .where(eq(reviews.placeId, row.place.id)),
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
      ...row,
      place: { ...row.place, reviews: placeReviews },
      images,
    };
  }
}
