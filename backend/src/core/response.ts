import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { z } from 'zod';

export function jsonResponse<S extends z.ZodType, Status extends ContentfulStatusCode>(
  c: Context,
  schema: S,
  data: z.input<S>,
  status: Status,
) {
  return c.json(schema.parse(data), status);
}
