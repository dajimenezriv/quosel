import { ApiError } from '@/core/api/errors';
import type { AuthVariables } from '@/core/api/middleware/auth';
import { jsonResponse, setupResponses } from '@/core/api/utils';
import { env } from '@/core/env';
import { Websites, type PlaceInsert, type ReviewInsert } from '@/infra/postgres/websites';
import { createRoute, z, type RouteHandler } from '@hono/zod-openapi';

/**
 * Place IDs uniquely identify a place in the Google Places database and on Google Maps. Examples:
 * ChIJRWnYS1BHYA0RK5rHEosqXcQ
 * GhIJQWDl0CIeQUARxks3icF8U8A
 * EicxMyBNYXJrZXQgU3QsIFdpbG1pbmd0b24sIE5DIDI4NDAxLCBVU0EiGhIYChQKEgnRTo6ixx-qiRHo_bbmkCm7ZRAN
 * EicxMyBNYXJrZXQgU3QsIFdpbG1pbmd0b24sIE5DIDI4NDAxLCBVU0E
 * IhoSGAoUChIJ0U6OoscfqokR6P225pApu2UQDQ
 * Place IDs are exempt from the caching restrictions stated in Section 3.2.3(b) of the Google Maps Platform Terms of Service.
 *
 * Place Details (New): https://places.googleapis.com/v1/places/ChIJRWnYS1BHYA0RK5rHEosqXcQ?fields=id,displayName&key=API_KEY
 * Place Details (Legacy): https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJRWnYS1BHYA0RK5rHEosqXcQ&key=YOUR_API_KEY
 *
 * Obtain Place ID for free at: https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 *
 * Sources: https://developers.google.com/maps/documentation/places/web-service/place-id
 */

const ResponseSchema = z.object({ websiteId: z.string() });

export const createFromGooglePlaceRoute = createRoute({
  method: 'post',
  path: '/create-from-google-place',
  request: {
    query: z.object({
      googlePlaceId: z.string().openapi({
        example: 'ChIJRWnYS1BHYA0RK5rHEosqXcQ',
      }),
    }),
  },
  responses: setupResponses(200, ResponseSchema),
});

export const createFromGooglePlace: RouteHandler<typeof createFromGooglePlaceRoute, { Variables: AuthVariables }> = async (c) => {
  const { googlePlaceId } = c.req.valid('query');
  const userId = c.get('userId');

  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(googlePlaceId)}`, {
    headers: {
      'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': '*',
    },
  });

  if (!res.ok) {
    throw new ApiError(500, 'Cannot obtain place details from Google Maps', { status: res.status, text: await res.text() });
  }

  const data = await res.json();
  const parsedData = await schema.parseAsync(data);

  const place: PlaceInsert = {
    googleId: googlePlaceId,
    userId,
    name: parsedData.displayName.text,
    internationalPhoneNumber: parsedData.internationalPhoneNumber,
    formattedAddress: parsedData.formattedAddress,
    shortFormattedAddress: parsedData.shortFormattedAddress,
    latitude: parsedData.location.latitude,
    longitude: parsedData.location.longitude,
    rating: parsedData.rating.toString(),
    userRatingCount: parsedData.userRatingCount,
    googleMapsPlaceUri: parsedData.googleMapsLinks.placeUri,
    googleMapsReviewsUri: parsedData.googleMapsLinks.reviewsUri,
    googleMapsPhotosUri: parsedData.googleMapsLinks.photosUri,
    raw: parsedData,
  };

  const reviews: ReviewInsert[] = parsedData.reviews.map((r) => ({
    googleId: r.name,
    rating: r.rating.toString(),
    text: r.originalText.text,
    authorName: r.authorAttribution.displayName,
    authorPhotoUri: r.authorAttribution.photoUri,
    publishTime: new Date(r.publishTime),
    googleMapsUri: r.googleMapsUri,
  }));

  const websiteId = await Websites.create(place, reviews);

  if (!websiteId) throw new ApiError(500, 'Failed to create place');

  return jsonResponse(c, ResponseSchema, { websiteId }, 200);
};

const schema = z.object({
  id: z.string(),
  nationalPhoneNumber: z.string(),
  internationalPhoneNumber: z.string(),
  formattedAddress: z.string(),
  location: z.object({ latitude: z.number(), longitude: z.number() }),
  rating: z.number(),
  regularOpeningHours: z.object({
    periods: z.array(
      z.object({
        open: z.object({ day: z.number(), hour: z.number(), minute: z.number() }),
        close: z.object({ day: z.number(), hour: z.number(), minute: z.number() }),
      }),
    ),
  }),
  userRatingCount: z.number(),
  displayName: z.object({ text: z.string(), languageCode: z.string() }),
  shortFormattedAddress: z.string(),
  reviews: z.array(
    z.object({
      name: z.string(),
      rating: z.number(),
      originalText: z.object({
        text: z.string(),
        languageCode: z.string(),
      }),
      authorAttribution: z.object({
        displayName: z.string(),
        photoUri: z.url(),
      }),
      publishTime: z.iso.datetime(),
      googleMapsUri: z.url(),
    }),
  ),
  googleMapsLinks: z.object({
    placeUri: z.url(),
    reviewsUri: z.url(),
    photosUri: z.url(),
  }),
});
