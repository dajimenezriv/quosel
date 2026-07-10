import { env } from '@/core/env';
import type { UserId } from '@/core/types';
import { prisma } from './client';
import type { Prisma } from './prisma/client';

export class WebsiteImages {
  static getUrl(imageId: string) {
    return `${env.CLOUDFLARE_R2_PUBLIC_URL}/images/${imageId}`;
  }

  static async getById(imageId: string) {
    return await prisma.websiteImage.findFirst({ where: { id: imageId } });
  }

  static async getAllByUserId(userId: UserId) {
    return await prisma.websiteImage.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async create(data: Prisma.WebsiteImageUncheckedCreateInput) {
    return await prisma.websiteImage.create({ data });
  }

  static async delete(userId: UserId, imageId: string) {
    return await prisma.websiteImage.delete({
      where: { id: imageId, userId },
    });
  }
}
