# Stage 1: Build the application using Maven
FROM maven:3.8.8-amazoncorretto-21 AS build

# Set the working directory in the build container
WORKDIR /app

# Copy the Maven project files to the working directory
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image with the built JAR file
FROM amazoncorretto:21-alpine

# Set the working directory in the runtime container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the application will run on
EXPOSE 8082

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]