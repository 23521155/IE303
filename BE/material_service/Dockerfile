FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
# Sao chép thư mục Material_Data vào container
COPY Material_Data ./Material_Data
EXPOSE 8083
ENTRYPOINT ["java", "-jar", "app.jar"]
