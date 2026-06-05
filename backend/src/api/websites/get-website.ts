import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Websites } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const ReviewSchema = z.object({
  id: z.string(),
  rating: z.number(),
  text: z.string(),
  authorName: z.string(),
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
  websiteImages: z.array(ImageSchema),
});

export const getWebsiteRoute = createRoute({
  method: 'get',
  path: '/get-website/{websiteId}',
  request: {
    params: z.object({ websiteId: z.string() }),
  },
  responses: setupResponses(200, ResponseSchema),
});

export const getWebsite: RouteHandler<typeof getWebsiteRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { websiteId } = c.req.valid('param');

  const website = await Websites.getById(userId, websiteId);
  if (!website) throw new ApiError(404, 'Website not found');

  return jsonResponse(c, ResponseSchema, website, 200);
};
