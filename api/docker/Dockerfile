# Use Amazon Corretto 21 JDK on Alpine Linux as the base image
FROM amazoncorretto:21-alpine

# Copy the JAR file from your build output to the working directory
COPY target/api-0.0.1-SNAPSHOT.jar api.jar


# Expose the port your application will run on (typically 8080 for Spring Boot)
EXPOSE 8082

# Command to run the application
ENTRYPOINT ["java", "-jar", "/api.jar"]