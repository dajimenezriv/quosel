import { ApiError, ErrorSchema } from '@/core/api/errors.ts';
import { jsonResponse } from '@/core/api/json-response.ts';
import type { AuthVariables } from '@/core/api/middleware/auth.ts';
import { Websites } from '@/infra/postgres/websites.ts';
import { createRoute, type RouteHandler } from '@hono/zod-openapi';
import z from 'zod';

const ReviewSchema = z.object({
  id: z.string(),
  googleReviewName: z.string(),
  rating: z.string(),
  originalText: z.string(),
  originalTextLanguageCode: z.string(),
  authorDisplayName: z.string(),
  authorPhotoUri: z.string(),
  publishTime: z.date(),
  googleMapsUri: z.string(),
  createdAt: z.date(),
});

const ImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  sizeBytes: z.number(),
  createdAt: z.date(),
});

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
  reviews: z.array(ReviewSchema),
});

const ResponseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  domain: z.string(),
  template: z.string(),
  texts: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  place: PlaceSchema,
  images: z.array(ImageSchema),
});

export const getWebsiteRoute = createRoute({
  method: 'get',
  path: '/get-website/:websiteId',
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: {
    200: {
      content: { 'application/json': { schema: ResponseSchema } },
      description: 'Full website details',
    },
    404: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Website not found',
    },
  },
});

export const getWebsite: RouteHandler<typeof getWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  return jsonResponse(c, ResponseSchema, website, 200);
};
