package com.team2.client.exception;

public class RecipeNotFoundException extends RuntimeException {
    public RecipeNotFoundException(String s) {
        super(s);
    }
}
