import type { UserId } from '@/core/types';
import { claudeStyles, emptyBlocks } from '@quosel/templates';
import { prisma } from './client';
import type { Prisma } from './prisma/client';

type WebsiteUpdate = Pick<Prisma.WebsiteUpdateInput, 'name' | 'publishedAt' | 'blocks' | 'styles'>;

export class Websites {
  static async getAllByUserId(userId: UserId) {
    return await prisma.website.findMany({ where: { userId } });
  }

  static async getById(websiteId: string) {
    return await prisma.website.findFirst({ where: { id: websiteId } });
  }

  static async create(userId: UserId, name: string) {
    return await prisma.website.create({
      data: {
        userId,
        name,
        blocks: emptyBlocks,
        styles: claudeStyles,
      },
    });
  }

  static async update(websiteId: string, data: WebsiteUpdate) {
    return await prisma.website.update({ where: { id: websiteId }, data });
  }

  static async delete(userId: UserId, websiteId: string) {
    return await prisma.website.delete({ where: { id: websiteId, userId } });
  }
}
