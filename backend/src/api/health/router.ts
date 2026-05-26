import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { jsonResponse } from '../../core/response.ts';

export const healthRouter = new OpenAPIHono();

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
