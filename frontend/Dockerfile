# Use official Node.js image as a base image
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build --production

# Start a new image for production
FROM node:18-alpine as production

# Set working directory for the production environment
WORKDIR /app

# Install only the production dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --only=production

# Copy built Next.js application from the builder stage
COPY --from=builder /app/.next ./.next

# Copy the public directory and other necessary files
COPY public ./public

# Expose port 3000 for the Next.js application
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]
