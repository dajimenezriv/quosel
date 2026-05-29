import z from 'zod';
import { env } from '../../core/env.ts';
import { Places, type PlaceInsert, type ReviewInsert } from '../../infra/postgres/places.ts';
import { ApiError } from '../errors.ts';

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

export async function addGooglePlace(googlePlaceId: string) {
  throw new ApiError(500, 'Hey');

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
    googlePlaceId,
    displayNameText: parsedData.displayName.text,
    displayNameLanguageCode: parsedData.displayName.languageCode,
    nationalPhoneNumber: parsedData.nationalPhoneNumber,
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
    googleReviewName: r.name,
    rating: r.rating.toString(),
    originalText: r.originalText.text,
    originalTextLanguageCode: r.originalText.languageCode,
    authorDisplayName: r.authorAttribution.displayName,
    authorPhotoUri: r.authorAttribution.photoUri,
    publishTime: new Date(r.publishTime),
    googleMapsUri: r.googleMapsUri,
  }));

  const placeId = await Places.addGooglePlace(place, reviews);

  return {
    placeId,
  };
}

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
