# Use Node.js Image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose Port
EXPOSE 5000

# Start App
CMD ["node", "server.js"]
