# 1. Use the official Node.js image as the base
FROM node:18-alpine

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy the pre-built .next folder and other necessary files
COPY . .

# 4. Expose port 3000 to access the containerized app
EXPOSE 3000

# 5. Start the Next.js app in production mode
CMD ["npm", "start"]
