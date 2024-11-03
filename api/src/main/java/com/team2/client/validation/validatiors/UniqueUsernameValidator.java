package com.team2.client.validation.validatiors;


import com.team2.client.repository.UserRepository;
import com.team2.client.validation.annotation.UniqueUsername;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername,String> {
    private UserRepository userRepository;// Assume you have a UserService to check for existing usernames

    @Autowired
    public UniqueUsernameValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public boolean isValid(String username, ConstraintValidatorContext context) {
        return this.userRepository.findByUsername(username).isEmpty();
    }

}
