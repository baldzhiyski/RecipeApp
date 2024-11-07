package com.team2.client.utils;

import java.security.SignatureException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.team2.client.domain.User;
import com.team2.client.exception.ApiException;
import com.team2.client.exception.JwtException;
import com.team2.client.exception.UserNotFound;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import org.slf4j.Logger;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * Global exception handler for managing exceptions thrown by controllers.
 * This class extends ResponseEntityExceptionHandler to customize the response
 * for specific exceptions that may occur during request processing.
 */
@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger log = org.slf4j.LoggerFactory.getLogger(ExceptionHandler.class);

    /**
     * Handles MethodArgumentNotValidException which occurs when validation of method
     * arguments annotated with @Valid fails.
     *
     * @param ex      The exception thrown when validation fails.
     * @param headers HTTP headers for the response.
     * @param status  The HTTP status code.
     * @param request The current web request.
     * @return A ResponseEntity containing a structured error response with validation errors.
     */
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        List<String> generalErrors = new ArrayList<>();

        // Iterate through the binding result to extract field-specific and general errors.
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            if (error instanceof FieldError fieldErr) {
                String fieldName = fieldErr.getField();
                String errorMessage = fieldErr.getDefaultMessage();
                // Map the field name to its corresponding error message.
                errors.put(fieldName, errorMessage);
            } else {
                // Collect general errors that do not pertain to a specific field.
                generalErrors.add(error.getDefaultMessage());
            }
        });

        // Create a structured error response for validation errors.
        HttpErrorResponse response = HttpErrorResponse.of("Unprocessable entity", 422, errors, generalErrors);

        return new ResponseEntity<>(response, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    /**
     * Handles custom ApiException thrown within the application.
     *
     * @param e The ApiException that was thrown.
     * @return A ResponseEntity containing the error message and HTTP status from the exception.
     */
    @org.springframework.web.bind.annotation.ExceptionHandler(ApiException.class)
    public ResponseEntity<HttpErrorResponse> handleException(ApiException e) {
        log.info("Handling ApiException: {}", e.getMessage());
        var response = HttpErrorResponse.of(e.getMessage(), e.getStatus(), e.getErrors(), null);
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getStatus()));
    }

    /**
     * Handles InternalAuthenticationServiceException, typically thrown when
     * an error occurs during the authentication process.
     *
     * @param e The InternalAuthenticationServiceException that was thrown.
     * @return A ResponseEntity indicating the unauthorized access with a relevant message.
     */
    @org.springframework.web.bind.annotation.ExceptionHandler(InternalAuthenticationServiceException.class)
    public ResponseEntity<HttpErrorResponse> handleException(InternalAuthenticationServiceException e) {
        log.info("Handling InternalAuthenticationServiceException: {}", e.getMessage());
        var response = HttpErrorResponse.of("Authentication service error: " + e.getMessage(), 500, null, null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Handles BadCredentialsException, typically thrown when authentication fails
     * due to invalid credentials.
     *
     * @param e The BadCredentialsException that was thrown.
     * @return A ResponseEntity indicating the unauthorized access with a relevant message.
     */
    @org.springframework.web.bind.annotation.ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<HttpErrorResponse> handleException(BadCredentialsException e) {
        log.info("Handling BadCredentialsException: {}", e.getMessage());
        var response = HttpErrorResponse.of(e.getMessage(), 401, null, null);
        return new ResponseEntity<>(response, HttpStatus.valueOf(401));
    }

    /**
     * Handles AuthorizationDeniedException, which occurs when a user attempts to
     * access a resource they are not authorized to.
     *
     * @param e The AuthorizationDeniedException that was thrown.
     * @return A ResponseEntity indicating forbidden access with a relevant message.
     */
    @org.springframework.web.bind.annotation.ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<HttpErrorResponse> handleException(AuthorizationDeniedException e) {
        log.info("Handling AuthorizationDeniedException: {}", e.getMessage());
        var response = HttpErrorResponse.of(e.getMessage(), 403, null, null);
        return new ResponseEntity<>(response, HttpStatus.valueOf(403));
    }

    /**
     * Handles any unhandled exceptions that may occur in the application.
     *
     * @param e The Exception that was thrown.
     * @return A ResponseEntity with a generic error message and an HTTP status of 500.
     */
    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public ResponseEntity<HttpErrorResponse> handleException(Exception e) {
        log.error("Unhandled exception", e);
        var response = HttpErrorResponse.of("Unexpected error", 500);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handle JwtException (Custom exception)
    @org.springframework.web.bind.annotation.ExceptionHandler(JwtException.class)
    public ResponseEntity<String> handleJwtException(JwtException ex) {
        // Return an appropriate HTTP status code and a meaningful message based on the exception
        return ResponseEntity.status(ex.getStatus())  // Use the HttpStatus from the exception
                .body(ex.getMessage()); // Include the message from the JwtException
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(UserNotFound.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFound ex) {
        // Return an appropriate HTTP status code and a meaningful message based on the exception
        return ResponseEntity.status(HttpStatus.BAD_REQUEST) // Use the HttpStatus from the exception
                .body(ex.getMessage()); // Include the message from the JwtException
    }


}
