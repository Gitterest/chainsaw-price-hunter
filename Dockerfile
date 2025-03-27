# ===========================
# Stage 1: Build Frontend
# ===========================
FROM node:20 AS frontend-build

WORKDIR /usr/src/frontend

# Install dependencies and build the frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend .
RUN npm run build

# ===========================
# Stage 2: Build Backend
# ===========================
FROM node:20 AS backend

WORKDIR /usr/src/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy the backend source code
COPY backend .

# ===========================
# Stage 3: Serve with Nginx for Frontend and Node for Backend
# ===========================
FROM nginx:alpine AS frontend

# Copy frontend build to Nginx HTML directory
COPY --from=frontend-build /usr/src/frontend/.next /usr/share/nginx/html
COPY frontend/public /usr/share/nginx/html/public
EXPOSE 80

# ===========================
# Start the Backend
# ===========================
FROM node:20 AS backend-run

WORKDIR /usr/src/backend

COPY --from=backend /usr/src/backend .
EXPOSE 5000

# Start both Nginx and Backend
CMD ["node", "server.js"]
