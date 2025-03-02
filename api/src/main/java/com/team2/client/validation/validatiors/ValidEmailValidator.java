package com.team2.client.validation.validatiors;


import com.team2.client.repository.UserRepository;
import com.team2.client.utils.AnnotationsUtil;
import com.team2.client.validation.annotation.ValidEmail;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.team2.client.utils.Constants.EMAIL_REGEX;


public class ValidEmailValidator implements ConstraintValidator<ValidEmail, String> {
    private static final Pattern pattern = Pattern.compile(EMAIL_REGEX);

    private String[] allowedDomains;
    private String emptyMessage;

    private String alreadyInUseMessage;
    private String message;

    private String invalidEmailMessage;

    private UserRepository userRepository;

    @Autowired
    public ValidEmailValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void initialize(ValidEmail constraintAnnotation) {
        emptyMessage = constraintAnnotation.emptyMessage();
        message = constraintAnnotation.message();
        invalidEmailMessage = constraintAnnotation.invalidDomainMessage();
        alreadyInUseMessage = constraintAnnotation.alreadyInUseMessage();
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        if (email == null || email.trim().isEmpty()) {
            AnnotationsUtil.setErrorMessage(context,emptyMessage);
            return false;
        }
        Matcher matcher = pattern.matcher(email);
        if (!matcher.matches()) {
            AnnotationsUtil.setErrorMessage(context,message);
            return false;
        }
        if(this.userRepository.findByEmail(email).isPresent()){
            AnnotationsUtil.setErrorMessage(context,alreadyInUseMessage);
            return false;
        }
        return true;
    }
}