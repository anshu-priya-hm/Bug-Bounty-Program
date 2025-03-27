# Use Node.js with Alpine
FROM node:18-alpine3.18

# Set working directory
WORKDIR /app

# Update repositories and install necessary dependencies
RUN apk update && apk add --no-cache python3 py3-pip py3-setuptools make g++ sqlite-libs

# Copy package.json and install frontend dependencies
COPY package.json package-lock.json ./
RUN npm install

# Move to backend folder and install backend dependencies
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install --build-from-source --force

# Move back to app directory and copy all files
WORKDIR /app
COPY . .

# To build Next.js for production
RUN npm run build

# Expose backend and frontend ports
EXPOSE 3000 5000

# Start both frontend & backend
CMD ["sh", "-c", "node backend/server.js & npm run start"]
