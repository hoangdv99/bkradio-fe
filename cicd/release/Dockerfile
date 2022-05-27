FROM node:14-alpine

WORKDIR /app
COPY yarn.lock ./
COPY package.deps.json package.json

RUN yarn
COPY . .
RUN yarn build
ENTRYPOINT [ "yarn", "start" ]
