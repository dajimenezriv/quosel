import { eq, type InferInsertModel } from 'drizzle-orm';
import { db } from './client.ts';
import { users } from './schema.ts';

export class Users {
  static async getUserByGoogleId(googleId: string) {
    const [res] = await db.select().from(users).where(eq(users.googleId, googleId));
    return res;
  }

  static async createUser(user: InferInsertModel<typeof users>) {
    const [res] = await db.insert(users).values(user).returning();
    return res;
  }
}
