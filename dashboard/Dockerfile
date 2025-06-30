# Dockerfile.dashboard
FROM node:22 AS build

WORKDIR /app

COPY ./dashboard/package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build/dashboard /usr/share/nginx/html/dashboard

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
