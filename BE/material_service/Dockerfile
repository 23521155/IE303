FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

COPY . .

RUN mvn clean package -f material_service -am -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=builder /app/material_service/target/material_service-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]