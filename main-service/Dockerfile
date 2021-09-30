FROM node:14.16.1-alpine3.10

WORKDIR /app

COPY . .

RUN npm install

RUN npm rebuild grpc --force

RUN npm run build

EXPOSE $MAIN_PORT