import { createRouter } from '@/core/api/create-router.ts';
import type { AuthVariables } from '@/middleware/auth.ts';
import { getWebsite, getWebsiteRoute } from './get-website.ts';
import { getWebsites, getWebsitesRoute } from './get-websites.ts';

export const websitesRouter = createRouter<{ Variables: AuthVariables }>();

websitesRouter.openapi(getWebsitesRoute, getWebsites);
websitesRouter.openapi(getWebsiteRoute, getWebsite);
