package com.team2.client.utils;

import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
/*
 * A class representing a structured HTTP error response.
 * This class is used to encapsulate error details that are sent back to the client
 * when an exception occurs in the application. It allows for a consistent response format,
 * making it easier for clients to understand and handle errors.
 */
public class HttpErrorResponse {
    private String message;
    private int status;
    private Map<String, String> errors;
    private List<String> generalErrors;

    public static HttpErrorResponse of(String message, int status, Map<String, String> errors, List<String> generalErrors) {
        HttpErrorResponse response = new HttpErrorResponse();
        response.message = message;
        response.status = status;
        response.errors = errors;
        response.generalErrors = generalErrors;
        return response;
    }

    public static HttpErrorResponse of(String message, int status) {
        HttpErrorResponse response = new HttpErrorResponse();
        response.message = message;
        response.status = status;
        return response;
    }
}