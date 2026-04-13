package com.edu.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AuthServiceApplication {

	public static void main(String[] args) {
		System.out.println("DB_PASSWORD = " + System.getenv("DB_PASSWORD"));
		SpringApplication.run(AuthServiceApplication.class, args);
	}

}
