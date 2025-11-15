# Stage 1: Build with Maven
FROM maven:3.9.1-eclipse-temurin-20 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run Spring Boot app
FROM eclipse-temurin:20-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

# Install MySQL client for DB checking
RUN apt-get update && apt-get install -y mysql-client && rm -rf /var/lib/apt/lists/*

# Use bash form to avoid $JAVA_OPTS issues
ENTRYPOINT bash /app/wait-for-db.sh db "java -jar app.jar"
