import type { UserId } from '@/core/types';
import { prisma } from './client';
import type { Prisma } from './prisma/client';
import { Websites } from './websites';

export class Users {
  static async getById(id: UserId) {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async getByGoogleId(googleId: string) {
    return await prisma.user.findUnique({ where: { googleId } });
  }

  static async update(id: UserId, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({ where: { id }, data });
  }

  static async updateByStripeCustomerId(stripeCustomerId: string, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({ where: { stripeCustomerId }, data });
  }

  static async create(user: Prisma.UserUncheckedCreateInput) {
    return await prisma.$transaction(async (tx) => {
      const userRow = await tx.user.create({ data: user });

      const domain = Websites.randomDomain('default');
      await tx.website.create({
        data: {
          placeId: '00000000-0000-0000-0000-000000000000',
          userId: userRow.id,
          domain,
          template: '',
        },
      });

      return userRow;
    });
  }
}
