package com.team2.client.service;


import com.team2.client.domain.User;
import com.team2.client.domain.dto.UserRegisterDto;

public interface UserService {

     User registerUser(UserRegisterDto userRegisterDto);
}
