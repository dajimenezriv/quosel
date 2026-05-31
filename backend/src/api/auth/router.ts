import { OpenAPIHono } from '@hono/zod-openapi';
import { googleCallback } from './google-callback.ts';
import { googleLogin } from './google-login.ts';
import { logout, logoutRoute } from './logout.ts';
import { me, meRoute } from './me.ts';

export const authRouter = new OpenAPIHono();

authRouter.get('/auth/google', googleLogin);
authRouter.get('/auth/google/callback', googleCallback);
authRouter.openapi(meRoute, me);
authRouter.openapi(logoutRoute, logout);
