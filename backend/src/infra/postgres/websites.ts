import { randomBytes } from 'node:crypto';
import type { UserId } from '@/core/types';
import { slugify } from '@/core/utils';
import { prisma } from './client';
import type { Prisma } from './prisma/client';

export type PlaceInsert = Prisma.PlaceUncheckedCreateInput;
export type ReviewInsert = Omit<Prisma.ReviewUncheckedCreateInput, 'placeId'>;

export class Websites {
  static randomDomain(name: string) {
    return `${slugify(name)}-${randomBytes(4).toString('hex')}`;
  }

  static async getAllByUserId(userId: UserId) {
    return await prisma.website.findMany({
      where: { userId },
      include: { place: true },
    });
  }

  static async getById(userId: UserId, websiteId: string) {
    return await prisma.website.findFirst({
      where: { id: websiteId, userId },
      include: {
        place: {
          include: { reviews: true },
        },
        websiteImages: true,
      },
    });
  }

  static async create(userId: UserId, place: PlaceInsert, placeReviews: ReviewInsert[]) {
    return await prisma.$transaction(async (tx) => {
      const { googleId: googlePlaceId, ...placeUpdate } = place;
      const { id: placeId } = await tx.place.upsert({
        where: { googleId: googlePlaceId },
        create: place,
        update: placeUpdate,
      });

      if (placeReviews.length > 0) {
        await Promise.all(
          placeReviews.map(({ googleId, ...reviewUpdate }) =>
            tx.review.upsert({
              where: { googleId },
              create: { ...reviewUpdate, googleId, placeId },
              update: { ...reviewUpdate, placeId },
            }),
          ),
        );
      }

      const domain = this.randomDomain(place.name);
      const websiteRow = await tx.website.create({
        data: { placeId, userId, domain, template: '' },
      });

      return websiteRow.id;
    });
  }
}
