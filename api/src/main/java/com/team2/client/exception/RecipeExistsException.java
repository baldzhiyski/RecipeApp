package com.team2.client.exception;

import jakarta.validation.constraints.NotBlank;

public class RecipeExistsException extends RuntimeException {
    public RecipeExistsException( String s) {
        super(s);
    }
}
