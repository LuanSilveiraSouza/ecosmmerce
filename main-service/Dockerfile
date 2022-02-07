FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app

RUN npm install

COPY . ./usr/src/app

RUN npm run build

COPY src/common/pb/transport.proto /usr/src/app/dist/common/pb

EXPOSE $MAIN_PORT