# Multi-stage Dockerfile for Next.js 14 (App Router) production
# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts
RUN npm install --only=dev --ignore-scripts

# Copy source
COPY . .

# Build
ENV NODE_ENV=production
RUN npm run build

# Runner stage
FROM node:20-alpine AS runner
WORKDIR /app

# Copy built files and prod deps
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Use the standalone server from Next.js
CMD ["node", "server.js"]
