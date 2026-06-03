import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const PlaceSchema = z.object({
  id: z.string(),
  googleId: z.string(),
  name: z.string(),
  internationalPhoneNumber: z.string(),
  formattedAddress: z.string(),
  shortFormattedAddress: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.number().nullable(),
  userRatingCount: z.number().nullable(),
  googleMapsPlaceUri: z.string(),
  googleMapsReviewsUri: z.string(),
  googleMapsPhotosUri: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

const WebsiteSchema = z.object({
  id: z.string(),
  userId: z.string(),
  domain: z.string(),
  template: z.string(),
  texts: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  place: PlaceSchema,
});

const ResponseSchema = z.object({ websites: z.array(WebsiteSchema) });

export const getWebsitesRoute = createRoute({
  method: 'get',
  path: '/get-websites',
  responses: setupResponses(200, ResponseSchema),
});

export const getWebsites: RouteHandler<typeof getWebsitesRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const websites = await Websites.getAllByUserId(userId);
  return jsonResponse(c, ResponseSchema, { websites }, 200);
};
