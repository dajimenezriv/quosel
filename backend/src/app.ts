import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { env } from "./env.ts";
import { healthRouter } from "./routes/health.ts";
import { placesRouter } from "./routes/places.ts";
import { authRouter } from "./routes/auth.ts";
import { billingRouter } from "./routes/billing.ts";
import { requireAuth } from "./middleware/auth.ts";
import { requestLogger } from "./middleware/logger.ts";

export const openApiDoc = {
  openapi: "3.1.0",
  info: {
    title: "Quosel API",
    version: "1.0.0",
  },
} as const;

export const app = new OpenAPIHono();

app.use("*", requestLogger);

app.use(
  "*",
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);

app.route("/", healthRouter);
app.route("/", authRouter);
app.route("/", billingRouter);

app.use("/places/*", requireAuth);
app.route("/", placesRouter);
