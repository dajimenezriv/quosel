import { createRouter } from '@/core/api/create-router';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { createWebsite, createWebsiteRoute } from './create-website';
import { deleteWebsite, deleteWebsiteRoute } from './delete-website';
import { generateFieldText, generateFieldTextRoute } from './generate-field-text';
import { getWebsite, getWebsiteRoute } from './get-website';
import { getWebsites, getWebsitesRoute } from './get-websites';
import { publicGetWebsite, publicGetWebsiteRoute } from './public-get-website';
import { publicUpdateWebsite, publicUpdateWebsiteRoute } from './public-update-website';
import { regenerateEditToken, regenerateEditTokenRoute } from './regenerate-edit-token';
import { updateWebsite, updateWebsiteRoute } from './update-website';

export const websitesRouter = createRouter<{ Variables: AuthVariables }>();

websitesRouter.openapi(publicGetWebsiteRoute, publicGetWebsite);
websitesRouter.openapi(publicUpdateWebsiteRoute, publicUpdateWebsite);

websitesRouter.openapi(createWebsiteRoute, createWebsite);
websitesRouter.openapi(generateFieldTextRoute, generateFieldText);
websitesRouter.openapi(getWebsitesRoute, getWebsites);
websitesRouter.openapi(getWebsiteRoute, getWebsite);
websitesRouter.openapi(updateWebsiteRoute, updateWebsite);
websitesRouter.openapi(regenerateEditTokenRoute, regenerateEditToken);
websitesRouter.openapi(deleteWebsiteRoute, deleteWebsite);
