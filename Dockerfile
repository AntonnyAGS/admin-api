FROM node:10

FROM node:10

WORKDIR /app

COPY package*.json ./

RUN yarn install --production

COPY . ./

ENV NODE_ENV=prod \
  NODE_PORT=3001

CMD [ "yarn", "build" ]