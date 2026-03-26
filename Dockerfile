# ============================================
# Stage 1: Install dependencies
# ============================================
FROM node:20-alpine AS dependencies

# libc6-compat may be needed for some npm packages on Alpine
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy lockfile + package.json first for better layer caching
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* .npmrc* ./

RUN \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ============================================
# Stage 2: Build the Next.js application
# ============================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy deps from stage 1
COPY --from=dependencies /app/node_modules ./node_modules

# Copy all source files
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the app (standalone output)
RUN npm run build

# ============================================
# Stage 3: Production runner
# ============================================
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create .next directory owned by nextjs for runtime cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone output + static files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
