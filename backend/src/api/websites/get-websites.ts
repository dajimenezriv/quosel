import { jsonResponse } from '@/core/api/json-response.ts';
import { Websites } from '@/infra/postgres/websites.ts';
import type { AuthVariables } from '@/middleware/auth.ts';
import { createRoute, type RouteHandler } from '@hono/zod-openapi';
import z from 'zod';

const PlaceSchema = z.object({
  id: z.string(),
  userId: z.string(),
  googlePlaceId: z.string(),
  displayNameText: z.string(),
  displayNameLanguageCode: z.string(),
  nationalPhoneNumber: z.string(),
  internationalPhoneNumber: z.string(),
  formattedAddress: z.string(),
  shortFormattedAddress: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  rating: z.string().nullable(),
  userRatingCount: z.number().nullable(),
  googleMapsPlaceUri: z.string(),
  googleMapsReviewsUri: z.string(),
  googleMapsPhotosUri: z.string(),
  raw: z.unknown().nullable(),
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

const WebsitesResponseSchema = z.object({ websites: z.array(WebsiteSchema) }).openapi('WebsitesResponse');

export const getWebsitesRoute = createRoute({
  method: 'get',
  path: '/get-websites',
  responses: {
    200: {
      content: { 'application/json': { schema: WebsitesResponseSchema } },
      description: 'List of websites for the authenticated user',
    },
  },
});

export const getWebsites: RouteHandler<typeof getWebsitesRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const websites = await Websites.getAllByUserId(userId);
  return jsonResponse(c, WebsitesResponseSchema, { websites }, 200);
};
