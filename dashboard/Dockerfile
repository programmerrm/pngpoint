# Dockerfile.dashboard
FROM node:22 AS build

WORKDIR /app

COPY ./dashboard/package*.json ./
RUN npm install

COPY ./dashboard .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
