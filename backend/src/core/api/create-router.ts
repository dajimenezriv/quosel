import { ErrorSchema } from '@/core/api/errors.ts';
import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { fromError } from 'zod-validation-error';
import { jsonResponse } from './json-response.ts';

export const createRouter = <E extends Env = Env>() =>
  new OpenAPIHono<E>({
    defaultHook: (result, c) => {
      if (!result.success) {
        const { message } = fromError(result.error);
        return jsonResponse(c, ErrorSchema, { error: message }, 400);
      }
    },
  });
