import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { R2 } from '@/infra/r2/r2';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const ResponseSchema = z.object({
  id: z.string(),
  url: z.string(),
  sizeBytes: z.number(),
  createdAt: z.date(),
});

export const uploadImageRoute = createRoute({
  method: 'post',
  path: '/upload',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            file: z.instanceof(File).openapi({ type: 'string', format: 'binary' }),
            websiteId: z.string().min(1),
          }),
        },
      },
    },
  },
  responses: setupResponses(201, ResponseSchema),
});

export const uploadImage: RouteHandler<typeof uploadImageRoute, { Variables: AuthVariables }> = async (c) => {
  const userId = c.get('userId');
  const { file, websiteId } = c.req.valid('form');

  if (!ALLOWED_TYPES.includes(file.type)) throw new ApiError(400, 'Invalid file type');
  if (file.size > MAX_SIZE) throw new ApiError(400, 'File too large (max 5 MB)');

  const id = crypto.randomUUID();
  await R2.upload(`images/${id}`, file);

  const image = await WebsiteImages.create({
    id,
    userId,
    websiteId,
    sizeBytes: file.size,
  });

  const url = WebsiteImages.getUrl(id);

  return jsonResponse(c, ResponseSchema, { ...image, url }, 201);
};
