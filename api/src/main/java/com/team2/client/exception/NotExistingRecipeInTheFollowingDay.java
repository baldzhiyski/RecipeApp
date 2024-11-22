package com.team2.client.exception;

public class NotExistingRecipeInTheFollowingDay extends RuntimeException {
    public NotExistingRecipeInTheFollowingDay(String message) {
        super(message);
    }
}
