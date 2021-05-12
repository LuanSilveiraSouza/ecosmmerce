FROM node:14.16.1-alpine3.10

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm rebuild grpc --force

COPY . .

EXPOSE $MAIN_PORT