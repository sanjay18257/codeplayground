package com.codeplayground.controller;

import com.codeplayground.dto.CodeExecutionRequest;
import com.codeplayground.dto.CodeExecutionResponse;
import com.codeplayground.service.CodeExecutionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CodeExecutionController {
    
    private final CodeExecutionService codeExecutionService;
    
    @PostMapping("/execute")
    public CodeExecutionResponse executeCode(@RequestBody CodeExecutionRequest request) {
        return codeExecutionService.executeCode(request);
    }
}
