import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { logger } from '../core/logger.ts';
import { extractPlaceFromUrl, PlacesError } from '../services/places.ts';

export const placesRouter = new OpenAPIHono();

const PlaceSchema = z
  .object({
    displayName: z.string(),
  })
  .openapi('Place');

const ErrorSchema = z.object({ error: z.string() }).openapi('PlacesError');

const extractPlace = createRoute({
  method: 'get',
  path: '/places',
  tags: ['Places'],
  summary: 'Extract business info from a Google Maps URL',
  description:
    'Accepts a Google Maps share link or full place URL. Resolves the URL, ' +
    'finds the place via Google Places API (New), and returns rich business data.',
  request: {
    query: z.object({
      url: z.url().openapi({
        example: 'https://maps.app.goo.gl/abc123',
      }),
    }),
  },
  responses: {
    200: {
      content: { 'application/json': { schema: PlaceSchema } },
      description: 'Place details',
    },
    400: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Could not parse URL',
    },
    404: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Place not found',
    },
    500: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Upstream API error',
    },
  },
});

placesRouter.openapi(extractPlace, async (c) => {
  const { url } = c.req.valid('query');
  try {
    const result = await extractPlaceFromUrl(url);
    return c.json(PlaceSchema.parse(result), 200);
  } catch (error) {
    if (error instanceof PlacesError) {
      return c.json({ error: error.message }, error.status);
    }
    const msg = error instanceof Error ? error.message : String(error);
    logger.error(`[places] error: ${msg}`, { err: error });
    return c.json({ error: msg }, 500);
  }
});
