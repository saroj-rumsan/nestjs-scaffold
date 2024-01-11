FROM node:lts-alpine

ARG PNPM_VERSION=8.8.0
# Create app directory
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . ./
EXPOSE 3300
ENV NODE_ENV production
CMD [ "yarn", "start:dev"]

