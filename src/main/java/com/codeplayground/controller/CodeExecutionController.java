package com.codeplayground.controller;

import com.codeplayground.dto.CodeExecutionRequest;
import com.codeplayground.dto.CodeExecutionResponse;
import com.codeplayground.service.CodeExecutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CodeExecutionController {
    private final CodeExecutionService codeExecutionService;

    @PostMapping("/execute")
    public ResponseEntity<CodeExecutionResponse> executeCode(@RequestBody CodeExecutionRequest request) {
        return ResponseEntity.ok(codeExecutionService.executeCode(request));
    }
    
    // Add a GET endpoint for health check
    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Service is up and running");
    }
}
