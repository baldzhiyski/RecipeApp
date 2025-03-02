package com.team2.client.validation.annotation;

import com.team2.client.validation.validatiors.FileNotEmptyValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static com.team2.client.utils.Constants.MAX_FILE_SIZE;


@Constraint(validatedBy = FileNotEmptyValidator.class)
@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidFile {
    String message() default "{file.invalid}";
    String emptyMessage() default "{file.empty}";
    String invalidType() default "{file.type.not.allowed}";
    String fileSizeExceed() default "{file.size.exceeded}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    long maxSize() default MAX_FILE_SIZE; // Maximum file size in bytes

    String[] allowedTypes() default {"image/jpeg", "image/jpg","image/png"}; // Allowed MIME types
}