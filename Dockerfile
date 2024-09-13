FROM node:18-slim

# 安装构建工具
# RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm --registry=https://registry.npmmirror.com

RUN pnpm install

COPY . ./

RUN pnpm build

# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres 通过命令查询容器内的 IP 地址
ENV DATABASE_HOST=172.17.0.3
ENV DATABASE_PORT=3306
ENV DATABASE_USER=root
ENV DATABASE_PASSWORD=2024YL888
ENV DATABASE_NAME=uvestor

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]
