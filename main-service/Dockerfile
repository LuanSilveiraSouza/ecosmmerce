FROM node:14.16.1-alpine3.10

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE $MAIN_PORT