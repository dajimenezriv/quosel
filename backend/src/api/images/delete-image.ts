import { ApiError } from '@/core/api/errors';
import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { R2 } from '@/infra/cloudflare/r2';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

export const deleteImageRoute = createRoute({
  method: 'delete',
  path: '/{imageId}',
  middleware: [requireAuth],
  request: {
    params: z.object({ imageId: z.string() }),
  },
  responses: setupResponses(204),
});

export const deleteImage: RouteHandler<typeof deleteImageRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { imageId } = c.req.valid('param');

  const image = await WebsiteImages.getById(imageId);
  if (!image || image.userId !== userId) throw new ApiError(404, 'Image not found');

  await WebsiteImages.delete(userId, imageId);

  await R2.delete(`images/${image.id}`);

  return c.body(null, 204);
};
