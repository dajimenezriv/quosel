import { createRouter } from '@/core/api/create-router';
import { googleCallback } from './google-callback';
import { googleLogin } from './google-login';
import { logout, logoutRoute } from './logout';
import { me, meRoute } from './me';

export const authRouter = createRouter();

authRouter.get('/google', googleLogin);
authRouter.get('/google/callback', googleCallback);
authRouter.openapi(meRoute, me);
authRouter.openapi(logoutRoute, logout);
