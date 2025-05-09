package com.codeplayground.service;

import com.codeplayground.dto.CodeExecutionRequest;
import com.codeplayground.dto.CodeExecutionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CodeExecutionService {
    private final WebClient.Builder webClientBuilder;

    @Value("${judge0.api.key}")
    private String apiKey;

    @Value("${judge0.api.url}")
    private String apiUrl;

    public CodeExecutionResponse executeCode(CodeExecutionRequest request) {
        try {
            System.out.println("Received execution request with input: " + request.getInput());
            Map<String, Object> submissionMap = new HashMap<>();
            submissionMap.put("source_code", request.getCode());
            submissionMap.put("language_id", getLanguageId(request.getLanguage()));
            submissionMap.put("stdin", request.getInput() != null ? request.getInput() : "");
            submissionMap.put("expected_output", "");
            System.out.println("Sending submission to Judge0 with stdin: " + submissionMap.get("stdin"));
            
            // Send to Judge0 API
            var response = webClientBuilder.build()
                    .post()
                    .uri(apiUrl + "/submissions")
                    .header("X-RapidAPI-Key", apiKey)
                    .header("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(submissionMap)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response == null || response.get("token") == null) {
                return CodeExecutionResponse.builder()
                        .status("error")
                        .error("Failed to get submission token from Judge0 API")
                        .build();
            }

            String token = (String) response.get("token");
            
            // Add a small delay to allow Judge0 to process the submission
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            // Get submission result
            var result = webClientBuilder.build()
                    .get()
                    .uri(apiUrl + "/submissions/" + token)
                    .header("X-RapidAPI-Key", apiKey)
                    .header("X-RapidAPI-Host", "judge0-ce.p.rapidapi.com")
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (result == null) {
                return CodeExecutionResponse.builder()
                        .status("error")
                        .error("Failed to get result from Judge0 API")
                        .build();
            }

            // Safely parse numeric values
            Double executionTime = null;
            Long memoryUsage = null;
            
            Object timeObj = result.get("time");
            if (timeObj != null) {
                try {
                    if (timeObj instanceof Number) {
                        executionTime = ((Number) timeObj).doubleValue();
                    } else {
                        executionTime = Double.parseDouble(timeObj.toString().replace(",", "."));
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Error parsing time: " + timeObj);
                }
            }
            
            Object memoryObj = result.get("memory");
            if (memoryObj != null) {
                try {
                    if (memoryObj instanceof Number) {
                        memoryUsage = ((Number) memoryObj).longValue();
                    } else {
                        memoryUsage = Long.parseLong(memoryObj.toString());
                    }
                } catch (NumberFormatException e) {
                    System.out.println("Error parsing memory: " + memoryObj);
                }
            }

            String output = null;
            Object stdoutObj = result.get("stdout");
            if (stdoutObj != null) {
                output = stdoutObj.toString();
            }

            String error = null;
            Object stderrObj = result.get("stderr");
            if (stderrObj != null && !stderrObj.toString().isEmpty()) {
                error = stderrObj.toString();
            }

            Object compileOutputObj = result.get("compile_output");
            if (compileOutputObj != null && !compileOutputObj.toString().isEmpty()) {
                error = (error == null) ? compileOutputObj.toString() : error + "\n" + compileOutputObj.toString();
            }

            // Check status
            String status = "success";
            if (error != null) {
                status = "error";
                // If there's an error but we also have output, include both
                if (output != null && !output.isEmpty()) {
                    output = output + "\n\n" + error;
                } else {
                    output = error;
                }
            }

            return CodeExecutionResponse.builder()
                    .output(output)
                    .executionTime(executionTime)
                    .memoryUsage(memoryUsage)
                    .status(status)
                    .error(error)
                    .build();
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace
            return CodeExecutionResponse.builder()
                    .status("error")
                    .output("Error executing code: " + e.getMessage())
                    .error("Error executing code: " + e.getMessage())
                    .build();
        }
    }

    private int getLanguageId(String language) {
        return switch (language.toLowerCase()) {
            case "javascript" -> 63;  // Node.js
            case "java" -> 62;       // Java (OpenJDK 13.0.1)
            case "python" -> 71;     // Python (3.8.1)
            case "cpp" -> 54;        // C++ (GCC 9.2.0)
            default -> throw new IllegalArgumentException("Unsupported language: " + language);
        };
    }
}
