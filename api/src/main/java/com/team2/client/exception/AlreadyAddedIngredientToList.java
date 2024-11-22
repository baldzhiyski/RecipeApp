package com.team2.client.exception;

import jakarta.validation.constraints.NotBlank;

public class AlreadyAddedIngredientToList extends RuntimeException {
    public AlreadyAddedIngredientToList( String message) {
        super(message);
    }
}
