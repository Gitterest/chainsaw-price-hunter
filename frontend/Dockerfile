# Use Node.js Image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Expose Port
EXPOSE 3000

# Start app using serve
RUN npm install -g serve
CMD ["serve", "-s", "out"]
