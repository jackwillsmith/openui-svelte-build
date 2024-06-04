######## WebUI frontend ########
FROM --platform=$BUILDPLATFORM node:21-alpine3.19 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build
