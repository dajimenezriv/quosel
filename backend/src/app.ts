import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { healthRouter } from "./routes/health.ts";
import { placesRouter } from "./routes/places.ts";
import { authRouter } from "./routes/auth.ts";
import { requireAuth } from "./middleware/auth.ts";

export const openApiDoc = {
  openapi: "3.1.0",
  info: {
    title: "Quosel API",
    version: "1.0.0",
    description: "Google Maps leads backend.",
  },
} as const;

export const app = new OpenAPIHono();

app.use(
  "*",
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:5173",
    credentials: true,
  }),
);

app.route("/", healthRouter);
app.route("/", authRouter);

app.use("/places/*", requireAuth);
app.route("/", placesRouter);
