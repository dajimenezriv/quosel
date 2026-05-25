# Quosel

## Frontend

### Cloudflare

```bash
npm run build
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
