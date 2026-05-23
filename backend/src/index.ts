import { serve } from "@hono/node-server";
import { app } from "./app.ts";

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server listening on http://localhost:${info.port}`);
  console.log(`Swagger UI:   http://localhost:${info.port}/ui`);
  console.log(`OpenAPI JSON: http://localhost:${info.port}/openapi.json`);
});
