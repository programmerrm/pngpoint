# =============================
# Step 1: Build Stage
# =============================
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# =============================
# Step 2: Production Stage
# =============================
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/dashboard 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
