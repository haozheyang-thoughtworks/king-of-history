FROM node:20-alpine AS build
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY packages/shared packages/shared
COPY packages/frontend packages/frontend
RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @king-of-history/frontend build

FROM nginx:alpine
COPY --from=build /app/packages/frontend/dist /usr/share/nginx/html
COPY packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

