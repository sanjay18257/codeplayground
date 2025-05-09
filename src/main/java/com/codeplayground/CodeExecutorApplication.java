package com.codeplayground;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;

import com.codeplayground.config.Judge0Properties;

@SpringBootApplication
@EnableConfigurationProperties(Judge0Properties.class)
public class CodeExecutorApplication {
    public static void main(String[] args) {
        SpringApplication.run(CodeExecutorApplication.class, args);
    }

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}
