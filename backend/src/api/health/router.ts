import { createRouter } from '@/core/api/create-router.ts';
import { createRoute, z } from '@hono/zod-openapi';
import { jsonResponse, setupResponses } from '../../core/api/utils.ts';

export const healthRouter = createRouter();

const ResponseSchema = z.object({ status: z.literal('ok') });

const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  responses: setupResponses(200, ResponseSchema),
});

healthRouter.openapi(healthRoute, (c) => {
  return jsonResponse(c, ResponseSchema, { status: 'ok' }, 200);
});
