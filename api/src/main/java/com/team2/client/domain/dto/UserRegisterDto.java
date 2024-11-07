package com.team2.client.domain.dto;

import com.team2.client.validation.annotation.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@PasswordMatch
public class UserRegisterDto {


    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "Last Name  is required")
    private String lastName;

    @UniqueUsername
    @NotBlank(message = "Username is required")
    private String username;

    @PasswordAnnotation
    private String password;

    @PasswordAnnotation
    private String confirmPassword;

    @ValidFile
    private MultipartFile profileImage;

    @NotBlank(message = "Email is required")
    @ValidEmail
    private String email;
}
