import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import { fromError } from 'zod-validation-error';
import { ApiError } from './errors.ts';

export const createRouter = <E extends Env = Env>() =>
  new OpenAPIHono<E>({
    defaultHook: (result) => {
      if (!result.success) {
        const { message } = fromError(result.error);
        throw new ApiError(400, message);
      }
    },
  });
