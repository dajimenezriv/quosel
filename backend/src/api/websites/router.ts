import { createRouter } from '@/core/api/create-router';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { createWebsite, createWebsiteRoute } from './create-website';
import { deleteWebsite, deleteWebsiteRoute } from './delete-website';
import { getWebsite, getWebsiteRoute } from './get-website';
import { getWebsites, getWebsitesRoute } from './get-websites';
import { updateWebsite, updateWebsiteRoute } from './update-website';

export const websitesRouter = createRouter<{ Variables: AuthVariables }>();

websitesRouter.openapi(createWebsiteRoute, createWebsite);
websitesRouter.openapi(getWebsitesRoute, getWebsites);
websitesRouter.openapi(getWebsiteRoute, getWebsite);
websitesRouter.openapi(updateWebsiteRoute, updateWebsite);
websitesRouter.openapi(deleteWebsiteRoute, deleteWebsite);
