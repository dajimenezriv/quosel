import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { jsonResponse } from '../../core/response.ts';
import { ErrorSchema } from '../errors.ts';
import { addGooglePlace } from './add-google-place.ts';

export const placesRouter = new OpenAPIHono();

const PlaceSchema = z.object({ placeId: z.string() }).openapi('Place');

const addGooglePlaceRoute = createRoute({
  method: 'post',
  path: '/add-google-place',
  request: {
    query: z.object({
      googlePlaceId: z.string().openapi({
        example: 'ChIJRWnYS1BHYA0RK5rHEosqXcQ',
      }),
    }),
  },
  responses: {
    200: {
      content: { 'application/json': { schema: PlaceSchema } },
      description: 'Place details',
    },
    500: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Error',
    },
  },
});

placesRouter.openapi(addGooglePlaceRoute, async (c) => {
  const { googlePlaceId } = c.req.valid('query');
  const result = await addGooglePlace(googlePlaceId);
  return jsonResponse(c, PlaceSchema, result, 200);
});
