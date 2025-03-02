package com.team2.client.validation.annotation;

import com.team2.client.validation.validatiors.ValidEmailValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.PARAMETER})
@Constraint(validatedBy = ValidEmailValidator.class)
public @interface ValidEmail {
    String message() default "{invalid.email.format}";
    String emptyMessage() default "{empty.email}";
    String invalidDomainMessage() default "{invalid.domain.option}";
    String alreadyInUseMessage() default "{email.already.in.use}";

    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

}