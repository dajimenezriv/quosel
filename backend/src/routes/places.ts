import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

export const placesRouter = new OpenAPIHono();

const extractPlace = createRoute({
  method: "get",
  path: "/places",
  tags: ["Places"],
  summary: "Extract info from a Google Maps place URL",
  description:
    "Pass a Google Maps place URL via the `url` query param. " +
    "Scraping is not yet implemented — the endpoint currently returns 204.",
  request: {
    query: z.object({
      url: z.url().openapi({
        example:
          "https://www.google.com/maps/place/Joe's+Coffee/@40.7128,-74.0060,17z",
      }),
    }),
  },
  responses: {
    204: { description: "No content (scraping not yet implemented)" },
  },
});

placesRouter.openapi(extractPlace, (c) => {
  const { url } = c.req.valid("query");
  // TODO: scrape `url` and return extracted place info.
  console.log(`[places] extract requested: ${url}`);
  return c.body(null, 204);
});
