import { createHash, randomBytes } from 'node:crypto';
import type { UserId } from '@/core/types';
import { claudeStyles, emptyBlocks, slugify } from '@quosel/core/templates';
import { prisma } from './client';
import type { Prisma } from './prisma/client';

export class Websites {
  static randomSlug(name: string) {
    return `${slugify(name)}-${randomBytes(4).toString('hex')}`;
  }

  static hashEditToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }

  static generateEditToken() {
    const token = randomBytes(32).toString('base64url');
    return { token, hash: this.hashEditToken(token) };
  }

  static async getAllByUserId(userId: UserId) {
    return await prisma.website.findMany({ where: { userId } });
  }

  static async countByUserId(userId: UserId) {
    return await prisma.website.count({ where: { userId } });
  }

  static async getById(userId: UserId, websiteId: string) {
    return await prisma.website.findFirst({ where: { id: websiteId, userId } });
  }

  static async getByEditToken(token: string) {
    const hash = this.hashEditToken(token);
    return await prisma.website.findFirst({ where: { editToken: hash } });
  }

  static async create(userId: UserId, name: string) {
    return await prisma.website.create({
      data: {
        userId,
        name,
        slug: this.randomSlug(name),
        editToken: this.generateEditToken().hash,
        blocks: emptyBlocks,
        styles: claudeStyles,
      },
    });
  }

  static async update(websiteId: string, data: Prisma.WebsiteUpdateInput) {
    return await prisma.website.update({ where: { id: websiteId }, data });
  }

  static async regenerateEditToken(websiteId: string, userId: UserId) {
    const { token, hash } = this.generateEditToken();
    await prisma.website.update({ where: { id: websiteId, userId }, data: { editToken: hash } });
    return token;
  }

  static async delete(userId: UserId, websiteId: string) {
    return await prisma.website.delete({ where: { id: websiteId, userId } });
  }
}
