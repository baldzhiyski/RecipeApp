package com.team2.client.utils;

import java.util.regex.Pattern;

public enum Constants {
    ;

    // Regex for email
    public static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@(abv\\.bg|yahoo\\.com|gmail\\.com)$";

    // Regex for the password
    public static final Pattern PATTERN_LOWER = Pattern.compile("[a-z]");
    public static final Pattern PATTERN_UPPER = Pattern.compile("[A-Z]");
    public static final Pattern PATTERN_DIGIT = Pattern.compile("[0-9]");
    public static final Pattern PATTERN_SYMBOL = Pattern.compile("[!@#$%^&*()_+<>?]");

}
