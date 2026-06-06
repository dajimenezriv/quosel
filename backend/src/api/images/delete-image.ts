import type { AuthVariables } from '@/core/api/middleware/auth';
import { setupResponses } from '@/core/api/utils';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { R2 } from '@/infra/r2/r2';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

export const deleteImageRoute = createRoute({
  method: 'delete',
  path: '/{imageId}',
  request: {
    params: z.object({ imageId: z.string() }),
  },
  responses: setupResponses(204),
});

export const deleteImage: RouteHandler<typeof deleteImageRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { imageId } = c.req.valid('param');

  const image = await WebsiteImages.delete(userId, imageId);

  await R2.delete(image.key);

  return c.body(null, 204);
};
