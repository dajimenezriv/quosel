import { env } from '../env.ts';

export type PlaceInfo = {
  displayName: string;
};

export type PlacesErrorStatus = 400 | 404 | 500;

export class PlacesError extends Error {
  status: PlacesErrorStatus;

  constructor(status: PlacesErrorStatus, message: string) {
    super(message);
    this.name = 'PlacesError';
    this.status = status;
  }
}

const FIELD_MASK = 'id,displayName';

async function resolveUrl(url: string): Promise<string> {
  const isShort = url.includes('maps.app.goo.gl') || url.includes('goo.gl/maps');
  if (!isShort) return url;
  const res = await fetch(url, { method: 'GET', redirect: 'follow' });
  return res.url;
}

function extractPlaceId(url: string): string | null {
  const m = url.match(/[?&]place_id=([^&]+)/);
  return m?.[1] ? decodeURIComponent(m[1]) : null;
}

function extractNameAndCoords(url: string): {
  name?: string;
  lat?: number;
  lng?: number;
} {
  const out: { name?: string; lat?: number; lng?: number } = {};
  const nameMatch = url.match(/\/place\/([^/@]+)/);
  if (nameMatch?.[1]) {
    out.name = decodeURIComponent(nameMatch[1]).replaceAll('+', ' ');
  }
  const coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch?.[1] && coordMatch[2]) {
    out.lat = Number(coordMatch[1]);
    out.lng = Number(coordMatch[2]);
  }
  return out;
}

type SearchTextResponse = { places?: Array<{ id: string }> };

async function findPlaceId(apiKey: string, query: string, bias?: { lat: number; lng: number }): Promise<string | null> {
  const body: Record<string, unknown> = { textQuery: query };
  if (bias) {
    body.locationBias = {
      circle: {
        center: { latitude: bias.lat, longitude: bias.lng },
        radius: 500,
      },
    };
  }
  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new PlacesError(500, `searchText ${res.status}: ${await res.text()}`);
  }
  const data = (await res.json()) as SearchTextResponse;
  return data.places?.[0]?.id ?? null;
}

type PlaceDetailsResponse = {
  id: string;
  displayName?: { text?: string };
};

async function fetchPlaceDetails(apiKey: string, placeId: string): Promise<PlaceDetailsResponse> {
  const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': FIELD_MASK,
    },
  });
  if (!res.ok) {
    throw new PlacesError(500, `placeDetails ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as PlaceDetailsResponse;
}

export async function extractPlaceFromUrl(url: string): Promise<PlaceInfo> {
  const apiKey = env.GOOGLE_MAPS_DEMO_API_KEY;

  const resolved = await resolveUrl(url);
  let placeId = extractPlaceId(resolved);

  if (!placeId) {
    const { name, lat, lng } = extractNameAndCoords(resolved);
    if (!name) {
      throw new PlacesError(400, 'Could not extract place_id or name from URL');
    }
    const bias = lat !== undefined && lng !== undefined ? { lat, lng } : undefined;
    placeId = await findPlaceId(apiKey, name, bias);
  }

  if (!placeId) throw new PlacesError(404, 'Place not found');

  const d = await fetchPlaceDetails(apiKey, placeId);

  return {
    displayName: d.displayName?.text ?? '',
  };
}
