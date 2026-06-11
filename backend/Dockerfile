# deps
FROM node:24-alpine AS deps

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

WORKDIR /app/backend
COPY backend/package.json ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile --prod

# build
FROM node:24-alpine AS build

WORKDIR /app
RUN corepack enable && corepack prepare pnpm@11 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY templates ./templates

WORKDIR /app/backend
COPY backend/package.json ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile

COPY backend/tsconfig.json backend/tsup.config.ts ./
COPY backend/prisma ./prisma
COPY backend/src ./src
RUN pnpm db:types && pnpm build

# runtime
FROM node:24-alpine AS runtime

WORKDIR /app/backend
RUN apk add --no-cache dumb-init

# backend/node_modules is pnpm symlinks into /app/node_modules/.pnpm, so both are needed
COPY --from=deps --chown=node:node /app/node_modules /app/node_modules
COPY --from=deps --chown=node:node /app/backend/node_modules ./node_modules
COPY --from=build --chown=node:node /app/backend/dist ./dist
COPY --chown=node:node backend/package.json ./

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"]
