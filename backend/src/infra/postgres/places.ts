import type { InferInsertModel } from 'drizzle-orm';
import { db } from './client.ts';
import { places, reviews } from './schema.ts';

export type PlaceInsert = InferInsertModel<typeof places>;
export type ReviewInsert = Omit<InferInsertModel<typeof reviews>, 'placeId'>;

export class Places {
  static async addGooglePlace(place: PlaceInsert, placeReviews: ReviewInsert[]) {
    return await db.transaction(async (tx) => {
      const [inserted] = await tx.insert(places).values(place).returning();
      if (!inserted) return;

      if (placeReviews.length > 0) {
        await tx.insert(reviews).values(
          placeReviews.map((r) => ({
            ...r,
            placeId: inserted.id,
          })),
        );
      }

      return inserted.id;
    });
  }
}
