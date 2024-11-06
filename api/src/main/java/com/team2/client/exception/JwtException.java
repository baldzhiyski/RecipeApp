package com.team2.client.exception;

import org.springframework.http.HttpStatus;

public class JwtException extends RuntimeException {
    private final HttpStatus status;

    public JwtException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}