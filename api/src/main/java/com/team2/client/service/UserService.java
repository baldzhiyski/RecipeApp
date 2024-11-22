package com.team2.client.service;


import com.team2.client.domain.User;
import com.team2.client.domain.dto.ImageResponseDto;
import com.team2.client.domain.dto.UserRegisterDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

     User registerUser(UserRegisterDto userRegisterDto);

    ImageResponseDto uploadProfileImage(String username, MultipartFile profileImage);
}
