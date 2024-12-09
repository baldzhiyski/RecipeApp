# Stage 1: Use Maven to build the application
FROM maven:3.8.8-amazoncorretto-21 AS build

# Set the working directory in the build container
WORKDIR /app

# Copy the Maven project files to the working directory
COPY pom.xml .
COPY src ./src

# Stage 2: Use the Amazon Corretto image as the base for runtime
FROM amazoncorretto:21-alpine

# Set the working directory in the runtime container
WORKDIR /app

# Copy the Maven project files into the runtime container
COPY pom.xml .
COPY src ./src

# Install dependencies and build the app when the container starts
CMD mvn clean install && java -jar target/api-0.0.1-SNAPSHOT.jar

# Expose the port the application will run on
EXPOSE 8082
