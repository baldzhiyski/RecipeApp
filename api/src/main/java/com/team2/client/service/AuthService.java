package com.team2.client.service;

import com.team2.client.domain.User;
import com.team2.client.domain.dto.LoginRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {
    void login(HttpServletRequest request, HttpServletResponse response, LoginRequest body) throws org.springframework.security.core.AuthenticationException;

    User getSession(HttpServletRequest request);

    void logout(HttpServletRequest request, HttpServletResponse response);
}
