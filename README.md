# Google Maps Leads

## Frontend

### Cloudflare

```bash
npm run build
npx wrangler login
npx wrangler pages project list
npx wrangler pages deploy dist --project-name=zephora
```

## Backend

```bash
docker login
docker build -t dajimenezriv/zephora-backend:latest .
docker push dajimenezriv/zephora-backend:latest
```
