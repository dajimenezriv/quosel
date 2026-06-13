import type { UserId } from '@/core/types';
import { circoloPopolareBlocks, claudeStyles } from '@quosel/templates';
import { prisma } from './client';
import type { Prisma } from './prisma/client';
import { Websites } from './websites';

type GoogleProfile = Pick<Prisma.UserUncheckedCreateInput, 'email' | 'name' | 'givenName' | 'familyName' | 'picture'>;

export class Users {
  static async getById(id: UserId) {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async update(id: UserId, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({ where: { id }, data });
  }

  static async updateByStripeCustomerId(stripeCustomerId: string, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({ where: { stripeCustomerId }, data });
  }

  static async createOrUpdate(googleId: string, data: GoogleProfile) {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUnique({ where: { googleId } });

      if (existing) {
        return await tx.user.update({ where: { googleId }, data });
      }

      const userRow = await tx.user.create({
        data: {
          ...data,
          googleId,
          subscriptionStatus: '',
          subscriptionPriceId: '',
        },
      });

      const name = 'Circolo Popolare';
      await tx.website.create({
        data: {
          userId: userRow.id,
          name,
          slug: Websites.randomSlug(name),
          blocks: circoloPopolareBlocks,
          styles: claudeStyles,
        },
      });

      return userRow;
    });
  }
}
