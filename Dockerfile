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

# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres 通过命令查询容器内的 IP 地址
ENV DATABASE_HOST=172.17.0.3
ENV DATABASE_PORT=3306
ENV DATABASE_USER=jweboy_u
ENV DATABASE_PASSWORD=jweboy_u18ahjks
ENV DATABASE_NAME=jweboy

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]





