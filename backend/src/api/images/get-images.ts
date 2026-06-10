import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const ImageSchema = z.object({
  id: z.string(),
  websiteId: z.string().nullable(),
  url: z.string(),
  sizeBytes: z.number(),
  createdAt: z.date(),
});

const ResponseSchema = z.object({
  images: z.array(ImageSchema),
});

export const getImagesRoute = createRoute({
  method: 'get',
  path: '/',
  middleware: [requireAuth],
  responses: setupResponses(200, ResponseSchema),
});

export const getImages: RouteHandler<typeof getImagesRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const rawImages = await WebsiteImages.getAllByUserId(userId);
  const images = rawImages.map((rawImage) => ({
    ...rawImage,
    url: WebsiteImages.getUrl(rawImage.id),
  }));
  return jsonResponse(c, ResponseSchema, { images }, 200);
};
