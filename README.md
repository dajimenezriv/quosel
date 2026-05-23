# Quosel

## Frontend

### Cloudflare

```bash
npm run build
npx wrangler login
npx wrangler pages project list
npx wrangler pages deploy dist --project-name=quosel
```

## Backend

```bash
docker login
docker build -t dajimenezriv/quosel-backend:latest .
docker push dajimenezriv/quosel-backend:latest
```

```bash
# download stripe cli
stripe listen --forward-to localhost:3000/webhooks/stripe
```
