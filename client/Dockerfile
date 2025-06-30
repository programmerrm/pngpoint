# Dockerfile.client
FROM node:22 AS build

WORKDIR /app

COPY ./client/package*.json ./
RUN npm install

COPY ./client .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
