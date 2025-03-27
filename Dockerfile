# -------- Stage 1: Build Frontend --------
FROM node:20 AS frontend-build

WORKDIR /usr/src/app/frontend

# Copy only package files to install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code and build
COPY frontend ./
RUN npm run build

# -------- Stage 2: Build Backend --------
FROM node:20 AS backend-build

WORKDIR /usr/src/app/backend

# Copy only package files to install dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend ./

# -------- Stage 3: Serve with Nginx for Frontend & Node for Backend --------
# Serve Frontend with Nginx
FROM nginx:alpine AS production

# Copy Frontend build output to Nginx HTML directory
COPY --from=frontend-build /usr/src/app/frontend/.next /usr/share/nginx/html

# Expose Frontend Port
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]

# -------- Backend Container --------
FROM node:20 AS backend

WORKDIR /usr/src/app/backend

# Copy backend build from previous stage
COPY --from=backend-build /usr/src/app/backend .

# Expose Backend Port
EXPOSE 5000

# Start Backend Server
CMD ["node", "server.js"]
