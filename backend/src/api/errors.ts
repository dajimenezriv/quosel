import type { ContentfulStatusCode } from 'hono/utils/http-status';
import z from 'zod';

export class ApiError extends Error {
  status: ContentfulStatusCode;
  extra?: Record<string, unknown>;

  constructor(status: ContentfulStatusCode, message: string, extra?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}

export const ErrorSchema = z.object({ error: z.string() }).openapi('PlacesError');
