# Step 1: Build the app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Run the app
FROM node:18 AS production

# Set the working directory for the production container
WORKDIR /app

# Copy only the necessary files from the build container
COPY --from=build /app /app

# Install production dependencies only
RUN npm install --production

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]