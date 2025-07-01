# =============================
# Step 1: Build Stage (React/Vue Build)
# =============================

# 👉 Use Node.js version 22 as the base image for building frontend
FROM node:22 AS build

# 👉 Set the working directory inside the container
WORKDIR /app

# 👉 Copy only dependency files to leverage Docker layer caching
# 🔥 Extra Tip: Always copy package*.json first to use cached node_modules layer
COPY package*.json ./

# 👉 Install npm dependencies
RUN npm install

# 👉 Now copy the rest of the source code
COPY . .

# 👉 Build the optimized production static files (dist folder will be created)
RUN npm run build

# =============================
# Step 2: Production Stage (Nginx Serve)
# =============================

# 👉 Use a lightweight production web server (Nginx Alpine)
# 🔥 Extra Tip: nginx:alpine is super small (~20MB) and very fast
FROM nginx:alpine

# 👉 Copy the built static files from build stage to Nginx’s HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# 👉 Expose port 80 (for serving HTTP traffic)
EXPOSE 80

# 👉 Start Nginx in foreground (container won’t exit immediately)
CMD [ "nginx", "-g", "daemon off;" ]
