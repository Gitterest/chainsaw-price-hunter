# Use Node.js LTS for building
FROM node:20 AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all frontend source code
COPY . .

# Build the frontend
RUN npm run build

# Use NGINX for serving the frontend
FROM nginx:alpine

# Copy build files to NGINX
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
