import { env } from '../../core/env.ts';
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

export async function getGooglePlace(placeId: string) {
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': '*',
    },
  });

  if (!res.ok) {
    throw new ApiError(500, 'Cannot obtain place details from Google Maps', { status: res.status, text: await res.text() });
  }

  const data = await res.json();
  console.log('🚀 ~ getGooglePlace ~ data:', data);

  return {
    displayName: 'Hey',
  };
}
