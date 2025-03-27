# Stage 1: Build Frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# Stage 2: Build Backend
FROM node:20 AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend ./

# Stage 3: Serve with Nginx for Frontend & Node for Backend
FROM nginx:alpine AS frontend
COPY --from=frontend-build /app/frontend/.next /usr/share/nginx/html

FROM node:20 AS backend
WORKDIR /app/backend
COPY --from=backend-build /app/backend ./
EXPOSE 5000
CMD ["node", "server.js"]

# Start both Backend and Nginx using a simple script
FROM ubuntu:22.04
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /usr/share/nginx/html /usr/share/nginx/html
COPY frontend/public /usr/share/nginx/html/public
WORKDIR /app/backend
EXPOSE 5000 80

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Create a simple startup script to run both backend and frontend
COPY <<EOF /start.sh
#!/bin/bash
service nginx start
node server.js
EOF

RUN chmod +x /start.sh
CMD ["/bin/bash", "/start.sh"]
