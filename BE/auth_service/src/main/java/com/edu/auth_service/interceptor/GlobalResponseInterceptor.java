package com.edu.auth_service.interceptor;

import com.edu.auth_service.dto.ApiResponse;
import com.edu.auth_service.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.*;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import org.springframework.web.context.request.*;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalResponseInterceptor implements ResponseBodyAdvice<Object> {

    @Override
    public boolean supports(MethodParameter returnType,
                            Class<? extends HttpMessageConverter<?>> converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(
            Object body,
            MethodParameter returnType,
            MediaType contentType,
            Class<? extends HttpMessageConverter<?>> converterType,
            ServerHttpRequest request,
            ServerHttpResponse response
    ) {

        ServletRequestAttributes attrs =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        HttpServletRequest servletRequest = attrs.getRequest();

        Object startTimeObj = servletRequest.getAttribute("startTime");
        long duration = 0;

        if (startTimeObj != null) {
            long startTime = (long) startTimeObj;
            duration = System.currentTimeMillis() - startTime;
        }

        Map<String,Object> result = new HashMap<>();

        if(body instanceof  ErrorResponse errorResponse)
        {
            result.put("statusCode", errorResponse.getStatusCode());
            result.put("message", errorResponse.getMessage());
            result.put("path", servletRequest.getRequestURI());
            result.put("timestamp", Instant.now());
            result.put("responseTime", duration + " ms");

            return result;
        }


        if(body instanceof ApiResponse<?> apiResponse){

            result.put("statusCode", apiResponse.getStatusCode());
            result.put("message", apiResponse.getMessage());
            result.put("data", apiResponse.getData());

        } else {
            result.put("statusCode", 200);
            result.put("data", body);

        }
        result.put("path", servletRequest.getRequestURI());
        result.put("timestamp", Instant.now());
        result.put("responseTime", duration + " ms");

        return result;
    }
}