package com.team2.client.validation.validatiors;


import com.team2.client.utils.AnnotationsUtil;
import com.team2.client.utils.Constants;
import com.team2.client.validation.annotation.PasswordAnnotation;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class PasswordValidator implements ConstraintValidator<PasswordAnnotation, CharSequence> {

    private int minLength;
    private int maxLength;
    private boolean hasUpper;
    private boolean hasLower;
    private boolean hasDigit;
    private boolean hasSpecialSymbol;

    @Override
    public void initialize(PasswordAnnotation password) {
        this.minLength = password.minLength();
        this.maxLength = password.maxLength();
        this.hasUpper = password.containsUpperCase();
        this.hasLower = password.containsLowerCase();
        this.hasDigit = password.containsDigit();
        this.hasSpecialSymbol = password.containsSpecialSymbols();
    }

    @Override
    public boolean isValid(final CharSequence value, final ConstraintValidatorContext context) {
        if (value.isEmpty()) {
            AnnotationsUtil.setErrorMessage(context, "{password.cannot.be.null}");
            return false;
        }

        if (value.length() < this.minLength) {
            AnnotationsUtil.setErrorMessage(context, "{password.too.short}");
            return false;
        }

        if (value.length() > this.maxLength) {
            AnnotationsUtil.setErrorMessage(context,"{password.too.long}" );
            return false;
        }

        String password = value.toString();

        if (!Constants.PATTERN_LOWER.matcher(password).find() && this.hasLower) {
            AnnotationsUtil.setErrorMessage(context, "{password.should.contain.lowercase.letter}");
            return false;
        }

        if (!Constants.PATTERN_UPPER.matcher(password).find() && this.hasUpper) {
            AnnotationsUtil.setErrorMessage(context,"{password.should.contain.uppercase.letter}");
            return false;
        }

        if (!Constants.PATTERN_DIGIT.matcher(password).find() && this.hasDigit) {
            AnnotationsUtil.setErrorMessage(context, "{password.should.contain.digit}");
            return false;
        }

        if (!Constants.PATTERN_SYMBOL.matcher(password).find() && this.hasSpecialSymbol) {
            AnnotationsUtil.setErrorMessage(context, "{password.should.contain.special.symbol}");
            return false;
        }

        return true;
    }
}