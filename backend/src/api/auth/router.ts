import { createRouter } from '@/core/api/create-router.ts';
import { googleCallback } from './google-callback.ts';
import { googleLogin } from './google-login.ts';
import { logout, logoutRoute } from './logout.ts';
import { me, meRoute } from './me.ts';

export const authRouter = createRouter();

authRouter.get('/google', googleLogin);
authRouter.get('/google/callback', googleCallback);
authRouter.openapi(meRoute, me);
authRouter.openapi(logoutRoute, logout);
