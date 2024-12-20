# 构建阶段
FROM node:18-slim AS builder

# 安装 Playwright 依赖
RUN apt-get update && apt-get install -y --no-install-recommends \
    libnss3 \
    libatk1.0-0 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libasound2 \
    libatspi2.0-0 \
    libxshmfence1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

RUN npm i -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install

# 安装 Playwright 浏览器
RUN npx playwright install chromium

RUN pnpm build 


# 运行阶段
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

RUN npm i -g pnpm --registry=https://registry.npmmirror.com && \
    pnpm install --prod --frozen-lockfile

# docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' postgres 通过命令查询容器内的 IP 地址
ENV DATABASE_HOST=172.17.0.9
ENV DATABASE_PORT=3306
ENV DATABASE_USER=jweboy_u
ENV DATABASE_PASSWORD=jweboy_u18ahjks
ENV DATABASE_NAME=jweboy

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]





