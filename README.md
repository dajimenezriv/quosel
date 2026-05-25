# Quosel

## Frontend

### Cloudflare

```bash
pnpm build
npx wrangler login
npx wrangler pages project list
npx wrangler pages project create quosel-frontend --production-branch main
npx wrangler pages project create quosel-landing --production-branch main
npx wrangler pages deploy dist --project-name=quosel-frontend --branch=main
npx wrangler pages deploy dist --project-name=quosel-landing --branch=main
```

## Backend

### Docker

```bash
docker login
docker build -t dajimenezriv/quosel-backend:latest .
docker push dajimenezriv/quosel-backend:latest
```

### Stripe

```bash
# download stripe cli
stripe listen --forward-to localhost:3000/webhooks/stripe
```

https://www.afi.io/blog/google-place-details-and-place-photos-api/?ref=blog.afi.io

curl \
  -H "X-Goog-Api-Key: AIzaSyAIHXHraVL1labP42UdnRFolkRZiENDQiY" \
  -H "X-Goog-FieldMask: displayName,photos,rating,reviews" \
  "https://places.googleapis.com/v1/places/ChIJxfUyYABJYA0Rizc0r2lqJk8"

  https://maps.app.goo.gl/Lonrh3TSdgpmPAUg7

https://maps.googleapis.com/maps/api/place/details/json?fields=photo&place_id=ChIJRWnYS1BHYA0RK5rHEosqXcQ&key=AIzaSyA9JQmyWyjY6nwpJAAPkiSsh-Z6p825qOU
https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=Ab43m-u3wUjhG3jCggHuBlw_Gwebjb4LMHDpDUVEQCxx_S9zPEli3OwzdakTHdzb76K0NHsaVClg_TMNZAD7JYK4ET2xfO5j3mUe9iVAsvXQSWJhcuTMilYfauuY7iTzvL-24DtLZ50xV8Z2Km1iM8lHH99ylR7qfZHPUltSo8n09_ukvgrG2EQm0NoVzawblkqVQbcK1iW_r8lYriTfZzCrm1o6YfRH_AnysMfUS6rV7yZwJ8ZGZgT7cP1_I7xRNXOZG4EdwPxozDqg4nOo3CiHgXMRYMTbj_fLFPJPRxcHpBfSAg&key=AIzaSyA9JQmyWyjY6nwpJAAPkiSsh-Z6p825qOU

NEW
https://places.googleapis.com/v1/places/ChIJRWnYS1BHYA0RK5rHEosqXcQ?fields=photos&key=AIzaSyA9JQmyWyjY6nwpJAAPkiSsh-Z6p825qOU

### Google Maps

https://places.googleapis.com/v1/places/ChIJRWnYS1BHYA0RK5rHEosqXcQ?key=AIzaSyAIHXHraVL1labP42UdnRFolkRZiENDQiY&fields=*
https://developers.google.com/maps/billing-and-pricing/pricing
https://developers.google.com/maps/billing-and-pricing/sku-details
