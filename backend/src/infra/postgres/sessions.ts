import { prisma } from './client';
import type { Prisma } from './prisma/client';

export class Sessions {
  static async getById(id: string) {
    return await prisma.session.findFirst({
      where: { id, expiresAt: { gt: new Date() } },
      include: { user: true },
    });
  }

  static async create(session: Prisma.SessionUncheckedCreateInput) {
    await prisma.session.create({ data: session });
  }

  static async deleteById(id: string) {
    await prisma.session.delete({ where: { id } });
  }
}
