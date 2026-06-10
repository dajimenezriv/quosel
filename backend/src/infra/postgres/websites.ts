import type { UserId } from '@/core/types';
import { circoloPopolareBlocks, claudeStyles } from '@quosel/templates';
import { prisma } from './client';
import type { Prisma } from './prisma/client';

export class Websites {
  // static randomDomain(name: string) {
  //   return `${slugify(name)}-${randomBytes(4).toString('hex')}`;
  // }

  static async getAllByUserId(userId: UserId) {
    return await prisma.website.findMany({ where: { userId } });
  }

  static async getById(userId: UserId, websiteId: string) {
    return await prisma.website.findFirst({ where: { id: websiteId, userId } });
  }

  static async create(userId: UserId, name: string) {
    return await prisma.website.create({
      data: {
        userId,
        name,
        blocks: circoloPopolareBlocks,
        styles: claudeStyles,
      },
    });
  }

  static async update(userId: UserId, websiteId: string, data: Prisma.WebsiteUpdateInput) {
    return await prisma.website.update({ where: { id: websiteId, userId }, data });
  }
}
