import { createMiddleware } from "hono/factory";
import { getCookie } from "hono/cookie";
import { validateSession } from "../auth/session.ts";

export type AuthVariables = {
  userId: string;
};

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(
  async (c, next) => {
    const id = getCookie(c, "session");
    if (!id) return c.json({ error: "unauthorized" }, 401);

    const row = await validateSession(id);
    if (!row) return c.json({ error: "unauthorized" }, 401);

    c.set("userId", row.user.id);
    await next();
  },
);
