package com.team2.client.service;

import com.team2.client.domain.User;
import com.team2.client.domain.dto.LoginRequest;
import com.team2.client.domain.dto.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;

public interface AuthService {
    ResponseEntity<LoginResponse> login(LoginRequest body) throws BadCredentialsException;

    ResponseEntity<User> getSession(HttpServletRequest request);

    void logout(HttpServletRequest request, HttpServletResponse response);
}
