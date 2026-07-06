import { randomBytes } from 'node:crypto';
import type { UserId } from '@/core/types';
import { claudeStyles, emptyBlocks, slugify } from '@quosel/core/templates';
import { prisma } from './client';
import type { Prisma } from './prisma/client';

export class Websites {
  static randomSlug(name: string) {
    const slug = `${slugify(name)}-${randomBytes(4).toString('hex')}`;
    return { slug, domain: `https://sites.quosel.com/${slug}` };
  }

  static generateEditToken() {
    return randomBytes(32).toString('base64url');
  }

  static async getAllByUserId(userId: UserId) {
    return await prisma.website.findMany({ where: { userId } });
  }

  static async countByUserId(userId: UserId) {
    return await prisma.website.count({ where: { userId } });
  }

  static async getById(userId: UserId, id: string) {
    return await prisma.website.findFirst({ where: { id, userId } });
  }

  static async getByEditToken(editToken: string) {
    return await prisma.website.findFirst({ where: { editToken } });
  }

  static async create(userId: UserId, name: string) {
    const { slug, domain } = this.randomSlug(name);
    return await prisma.website.create({
      data: {
        userId,
        name,
        slug,
        domain,
        editToken: this.generateEditToken(),
        blocks: emptyBlocks,
        styles: claudeStyles,
      },
    });
  }

  static async update(id: string, data: Prisma.WebsiteUpdateInput) {
    return await prisma.website.update({ where: { id }, data });
  }

  static async regenerateEditToken(userId: UserId, id: string) {
    const editToken = this.generateEditToken();
    await prisma.website.update({ where: { id, userId }, data: { editToken } });
    return editToken;
  }

  static async delete(userId: UserId, id: string) {
    return await prisma.website.delete({ where: { id, userId } });
  }
}
