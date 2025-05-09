# Use a specific version of OpenJDK (Java 21 in this case)
FROM eclipse-temurin:21-jdk

# Set the working directory inside the container
WORKDIR /app

# Copy the generated .jar file into the container (adjust the filename based on your build)
COPY target/*.jar app.jar

# Expose the port your Spring Boot app will run on
EXPOSE 8080

# Define the command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
