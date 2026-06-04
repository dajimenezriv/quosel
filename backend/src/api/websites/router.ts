import { createRouter } from '@/core/api/create-router';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { createFromGooglePlace, createFromGooglePlaceRoute } from './create-from-google-place';
import { getWebsite, getWebsiteRoute } from './get-website';
import { getWebsites, getWebsitesRoute } from './get-websites';
import { publish, publishRoute } from './publish';

export const websitesRouter = createRouter<{ Variables: AuthVariables }>();

websitesRouter.openapi(getWebsitesRoute, getWebsites);
websitesRouter.openapi(getWebsiteRoute, getWebsite);
websitesRouter.openapi(createFromGooglePlaceRoute, createFromGooglePlace);
websitesRouter.openapi(publishRoute, publish);
