package com.team2.client.exception;


import lombok.*;

import java.util.Map;

/**
 * Custom exception class for handling API errors.
 */
@Getter
@Builder
public class ApiException extends RuntimeException {
    private String message;
    private int status = 400;
    private Map<String, String> errors;
}
