import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class ApiError extends Error {
  status: ContentfulStatusCode;
  extra?: Record<string, unknown>;

  constructor(status: ContentfulStatusCode, message: string, extra?: Record<string, unknown>) {
    super(message);
    this.status = status;
    this.extra = extra;
  }
}
