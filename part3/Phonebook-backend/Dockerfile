FROM node:23-alpine

WORKDIR /app

COPY package* /app

RUN npm install

RUN npm install -g nodemon

COPY . .