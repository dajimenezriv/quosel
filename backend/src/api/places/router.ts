import { createRouter } from '@/core/api/create-router.ts';
import type { AuthVariables } from '@/middleware/auth.ts';
import { addGooglePlace, addGooglePlaceRoute } from './add-google-place.ts';

export const placesRouter = createRouter<{ Variables: AuthVariables }>();

placesRouter.openapi(addGooglePlaceRoute, addGooglePlace);
