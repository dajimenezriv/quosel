import { createMiddleware } from "hono/factory";

const MAX_BODY_LOG = 500;

export const requestLogger = createMiddleware(async (c, next) => {
  const start = Date.now();
  const { method } = c.req;
  const path = c.req.path;

  console.log(`→ ${method} ${path}`);

  await next();

  const ms = Date.now() - start;
  const status = c.res.status;

  let bodyPreview = "";
  const ct = c.res.headers.get("content-type") ?? "";
  if (ct.includes("application/json") || ct.startsWith("text/")) {
    try {
      const cloned = c.res.clone();
      const text = await cloned.text();
      bodyPreview =
        text.length > MAX_BODY_LOG
          ? ` ${text.slice(0, MAX_BODY_LOG)}…(${text.length}b)`
          : ` ${text}`;
    } catch {
      // ignore
    }
  }

  console.log(`← ${method} ${path} ${status} ${ms}ms${bodyPreview}`);
});
