import { randomBytes } from 'node:crypto';
import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { WebsiteImages } from '@/infra/postgres/website-images';
import { uploadToR2 } from '@/infra/r2/upload';
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

  const ext = file.type.split('/')[1];
  const key = `images/${userId}/${randomBytes(8).toString('hex')}.${ext}`;
  const url = await uploadToR2(key, file);

  const image = await WebsiteImages.create({
    userId,
    websiteId,
    url,
    sizeBytes: file.size,
  });

  return jsonResponse(c, ResponseSchema, image, 201);
};
