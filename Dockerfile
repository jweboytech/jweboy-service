# 构建阶段
FROM node:18-slim AS builder

WORKDIR /app

COPY . .

RUN npm i -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install

RUN pnpm build 


# 运行阶段
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install --prod --frozen-lockfile

ARG DATABASE_URL

ENV DATABASE_URL=$DATABASE_URL

EXPOSE 4100

CMD [ "npm", "run", "start:prod" ]





