package com.team2.client.service.impl;

import com.team2.client.domain.User;

import com.team2.client.repository.UserRepository;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws BadCredentialsException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Cannot find user with email " + email));
        return user;
    }
}