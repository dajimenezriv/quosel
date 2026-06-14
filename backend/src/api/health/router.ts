import { createRouter } from '@/core/api/create-router';
import { prisma } from '@/infra/postgres/client';
import { createRoute, z } from '@hono/zod-openapi';
import { jsonResponse, setupResponses } from '../../core/api/utils';

export const healthRouter = createRouter();

const ResponseSchema = z.object({ status: z.literal('ok') });

const healthRoute = createRoute({
  method: 'get',
  path: '/healthz',
  responses: setupResponses(200, ResponseSchema),
});

healthRouter.openapi(healthRoute, async (c) => {
  await prisma.$queryRaw`SELECT 1`;
  return jsonResponse(c, ResponseSchema, { status: 'ok' }, 200);
});
