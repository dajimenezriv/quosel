import { createRouter } from '@/core/api/create-router.ts';
import { createRoute, z } from '@hono/zod-openapi';
import { jsonResponse } from '../../core/api/json-response.ts';

export const healthRouter = createRouter();

const HealthSchema = z.object({ status: z.literal('ok') }).openapi('Health');

const healthRoute = createRoute({
  method: 'get',
  path: '/health',
  responses: {
    200: {
      content: { 'application/json': { schema: HealthSchema } },
      description: 'Service is healthy',
    },
  },
});

healthRouter.openapi(healthRoute, (c) => {
  return jsonResponse(c, HealthSchema, { status: 'ok' }, 200);
});
