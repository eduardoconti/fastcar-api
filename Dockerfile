FROM node:16

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn
COPY . .

EXPOSE ${PORT}
CMD [ "node", "dist/main.ts" ]