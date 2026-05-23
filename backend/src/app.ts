import { OpenAPIHono } from "@hono/zod-openapi";
import { healthRouter } from "./routes/health.ts";
import { placesRouter } from "./routes/places.ts";

export const openApiDoc = {
  openapi: "3.1.0",
  info: {
    title: "Quosel API",
    version: "1.0.0",
    description: "Google Maps leads backend.",
  },
} as const;

export const app = new OpenAPIHono();

app.route("/", healthRouter);
app.route("/", placesRouter);
