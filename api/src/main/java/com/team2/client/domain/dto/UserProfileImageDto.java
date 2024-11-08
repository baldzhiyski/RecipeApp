package com.team2.client.domain.dto;

import com.team2.client.validation.annotation.UniqueUsername;
import com.team2.client.validation.annotation.ValidFile;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class UserProfileImageDto {

    @ValidFile
    private MultipartFile profileImage;
}