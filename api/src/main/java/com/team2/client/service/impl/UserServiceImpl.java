package com.team2.client.service.impl;

import com.team2.client.domain.User;
import com.team2.client.domain.dto.UserRegisterDto;
import com.team2.client.domain.enums.Role;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private ModelMapper mapper;

    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;

    public UserServiceImpl(ModelMapper mapper, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(UserRegisterDto userRegisterDto) {
        User mapped = this.mapper.map(userRegisterDto, User.class);
        mapped.setRoleType(Role.USER);
        mapped.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        mapped.setCreatedRecipes(new ArrayList<>());
        mapped.setUuid(UUID.randomUUID());

        this.userRepository.saveAndFlush(mapped);
        return mapped;
    }

    // TODO : Send verification email if needed ( Additional feature )
}
