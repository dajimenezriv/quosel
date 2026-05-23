import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

export const healthRouter = new OpenAPIHono();

const HealthSchema = z.object({ status: z.literal("ok") }).openapi("Health");

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  tags: ["System"],
  summary: "Health check",
  responses: {
    200: {
      content: { "application/json": { schema: HealthSchema } },
      description: "Service is healthy",
    },
  },
});

healthRouter.openapi(healthRoute, (c) => {
  // .parse() = runtime guarantee the response matches the schema in the spec.
  return c.json(HealthSchema.parse({ status: "ok" }), 200);
});
