package com.edu.user_service.config;

import com.edu.user_service.interceptor.RequestTimeInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        registry.addInterceptor(new RequestTimeInterceptor())
                .addPathPatterns("/**"); // áp dụng cho mọi API

    }
}
