import { requireAuth, type AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { Ai } from '@/infra/ai/ai';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

const BodySchema = z.object({ prompt: z.string() });

const ResponseSchema = z.object({ text: z.string() });

export const generateFieldTextRoute = createRoute({
  method: 'post',
  path: '/generate-field-text',
  middleware: [requireAuth],
  request: {
    body: {
      content: {
        'application/json': {
          schema: BodySchema,
        },
      },
    },
  },
  responses: setupResponses(200, ResponseSchema),
});

export const generateFieldText: RouteHandler<typeof generateFieldTextRoute, { Variables: AuthVariables }> = async (c) => {
  const { prompt } = c.req.valid('json');

  const text = await Ai.generateFieldText(prompt);

  return jsonResponse(c, ResponseSchema, { text }, 200);
};
