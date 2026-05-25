import { env } from "./env.ts";
import { serve } from "@hono/node-server";
import { app } from "./app.ts";

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  console.log(`Server listening on http://localhost:${info.port}`);
  console.log(`Swagger UI:   http://localhost:${info.port}/ui`);
  console.log(`OpenAPI JSON: http://localhost:${info.port}/openapi.json`);
});
