import { z } from '@hono/zod-openapi';
import type { Context } from 'hono';
import type { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status';

export function jsonResponse<S extends z.ZodType, Status extends ContentfulStatusCode>(
  c: Context,
  schema: S,
  data: z.input<S>,
  status: Status,
) {
  return c.json(schema.parse(data), status);
}

const ErrorSchema = z.object({ message: z.string() }).openapi('Error');

export function setupResponses(code: StatusCode, schema?: z.ZodObject) {
  return {
    [code]: {
      ...(schema ? { content: { 'application/json': { schema } } } : null),
      description: '',
    },
    500: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'Error',
    },
  };
}
