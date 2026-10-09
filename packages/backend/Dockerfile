# 生产环境 Dockerfile（占位骨架，后续在 M5 完善多阶段构建 + migration）
FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY packages/shared packages/shared
COPY packages/backend packages/backend
RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @king-of-history/backend build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 4000
CMD ["node", "packages/backend/dist/index.js"]

