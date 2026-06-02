import { and, eq, gt, type InferInsertModel } from 'drizzle-orm';
import { db } from './client';
import { sessions, users } from './schema';

export class Sessions {
  static async getById(id: string) {
    const [res] = await db
      .select({ user: users, session: sessions })
      .from(sessions)
      .innerJoin(users, eq(users.id, sessions.userId))
      .where(and(eq(sessions.id, id), gt(sessions.expiresAt, new Date())));
    return res;
  }

  static async create(session: InferInsertModel<typeof sessions>) {
    await db.insert(sessions).values(session);
  }

  static async deleteById(id: string) {
    await db.delete(sessions).where(eq(sessions.id, id));
  }
}
