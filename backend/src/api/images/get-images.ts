import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const ImageSchema = z.object({
  id: z.string(),
  websiteId: z.string(),
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
  responses: setupResponses(200, ResponseSchema),
});

export const getImages: RouteHandler<typeof getImagesRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const images = await WebsiteImages.getAllByUserId(userId);
  return jsonResponse(c, ResponseSchema, { images }, 200);
};
