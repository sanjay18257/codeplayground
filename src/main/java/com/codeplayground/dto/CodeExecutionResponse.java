package com.codeplayground.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CodeExecutionResponse {
    private String output;
    private Double executionTime;  
    private Long memoryUsage;
    private String status;
    private String error;
}
