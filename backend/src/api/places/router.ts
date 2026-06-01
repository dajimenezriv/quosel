import { createRouter } from '@/core/api/create-router.ts';
import { addGooglePlace, addGooglePlaceRoute } from './add-google-place.ts';

export const placesRouter = createRouter();

placesRouter.openapi(addGooglePlaceRoute, addGooglePlace);
