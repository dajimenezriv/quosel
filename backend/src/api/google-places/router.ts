import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { getGooglePlace } from './get-google-place.ts';

export const placesRouter = new OpenAPIHono();

const PlaceSchema = z.object({ displayName: z.string() }).openapi('Place');

const ErrorSchema = z.object({ error: z.string() }).openapi('PlacesError');

const extractPlace = createRoute({
  method: 'get',
  path: '/places',
  request: {
    query: z.object({
      placeId: z.string().openapi({
        example: 'ChIJRWnYS1BHYA0RK5rHEosqXcQ',
      }),
    }),
  },
  responses: {
    200: {
      content: { 'application/json': { schema: PlaceSchema } },
      description: 'Place details',
    },
  },
});

placesRouter.openapi(extractPlace, async (c) => {
  const { placeId } = c.req.valid('query');
  const result = await getGooglePlace(placeId);
  return c.json(PlaceSchema.parse(result), 200);
});
