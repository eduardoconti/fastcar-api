ARG PORT=3001

FROM node:16.16-alpine as development

ENV NODE_ENV=development

WORKDIR /usr/src

RUN chmod -R 777 ./

ENV PATH /usr/src/node_modules/.bin/:$PATH

COPY package*.json ./

WORKDIR /usr/src/app

RUN chmod -R 777 ./

COPY . .

EXPOSE ${PORT}

FROM development as builder

RUN yarn build

FROM node:16.16-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache -U upgrade

RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package*.json .env ./

USER node

RUN yarn --production=true

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist

EXPOSE ${PORT}
ENV NODE_PATH=dist

CMD [ "node", "dist/main/server.ts" ]