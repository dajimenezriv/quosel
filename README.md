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

### Recover Backup

```bash
cd backend
RAILWAY_DATABASE_URL=$(grep '^RAILWAY_DATABASE_URL=' .env | cut -d= -f2- | tr -d '"')
gunzip -c backups_quosel-*.sql.gz | psql "$RAILWAY_DATABASE_URL" -v ON_ERROR_STOP=1
```

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
