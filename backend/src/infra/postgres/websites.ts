import type { UserId } from '@/core/types';
import { slugify } from '@/core/utils';
import { and, eq, getTableColumns, type InferInsertModel } from 'drizzle-orm';
import { db } from './client';
import { places, reviews, websiteImages, websites } from './schema';

export type PlaceInsert = InferInsertModel<typeof places>;
export type ReviewInsert = Omit<InferInsertModel<typeof reviews>, 'placeId'>;

export class Websites {
  static async getAllByUserId(userId: UserId) {
    return await db
      .select({ ...getTableColumns(websites), place: places })
      .from(websites)
      .innerJoin(places, eq(websites.placeId, places.id))
      .where(eq(websites.userId, userId));
  }

  static async getById(userId: UserId, websiteId: string) {
    const [websiteRow] = await db
      .select({ ...getTableColumns(websites), place: places })
      .from(websites)
      .innerJoin(places, eq(websites.placeId, places.id))
      .where(and(eq(websites.id, websiteId), eq(websites.userId, userId)));
    if (!websiteRow) return;

    const [reviewRows, imageRows] = await Promise.all([
      db.select(getTableColumns(reviews)).from(reviews).where(eq(reviews.placeId, websiteRow.place.id)),
      db.select(getTableColumns(websiteImages)).from(websiteImages).where(eq(websiteImages.websiteId, websiteId)),
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
