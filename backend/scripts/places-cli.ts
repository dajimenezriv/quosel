import { extractPlaceFromUrl, PlacesError } from "../src/services/places.ts";

const url = process.argv[2];

if (!url) {
  console.error("Usage: npm run places:cli -- <google-maps-url>");
  process.exit(1);
}

try {
  const place = await extractPlaceFromUrl(url);
  console.log(JSON.stringify(place, null, 2));
} catch (err) {
  if (err instanceof PlacesError) {
    console.error(`[${err.status}] ${err.message}`);
  } else {
    console.error(err);
  }
  process.exit(1);
}
