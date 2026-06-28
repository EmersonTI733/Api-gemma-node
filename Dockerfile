# syntax=docker/dockerfile:1

ARG NODE_VERSION=24.14.1
ARG PNPM_VERSION=10.33.0

FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV production

RUN npm install -g pnpm@10.33.0 && \
    apk add --no-cache python3 make g++

WORKDIR /usr/src

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --prod --frozen-lockfile --force
RUN mkdir -p /usr/src/uploads && chown -R node:node /usr/src/uploads

USER node

COPY . .

EXPOSE 3001

CMD pnpm start
