# -----------------------------
# 1. Base
# -----------------------------
FROM node:20-alpine AS base
WORKDIR /app

# -----------------------------
# 2. Dependencias (BUILD)
# -----------------------------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# -----------------------------
# 3. Build
# -----------------------------
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# -----------------------------
# 4. Runtime (PRODUCCIÓN)
# -----------------------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
