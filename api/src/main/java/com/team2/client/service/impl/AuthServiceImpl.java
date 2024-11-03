package com.team2.client.service.impl;



import com.team2.client.config.SecurityUtil;
import com.team2.client.domain.User;
import com.team2.client.domain.dto.LoginRequest;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Implementation of the AuthService interface for managing user authentication
 * and session handling within the application.
 */
@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    /**
     * Constructs an AuthServiceImpl instance, initializing dependencies and configuring
     * the security context repository.
     *
     * @param userRepository        Repository for User entity operations
     * @param authenticationManager Manager for handling authentication logic
     */
    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    /**
     * Authenticates the user based on provided credentials and establishes a
     * security context for the session. If authentication is successful, the
     * security context is saved, effectively logging the user in.
     *
     * @param request HTTP request for the current session
     * @param response HTTP response to update with the security context
     * @param body LoginRequest object containing email and password for authentication
     * @throws AuthenticationException if authentication fails due to invalid credentials
     */
    @Override
    public void login(HttpServletRequest request,
                      HttpServletResponse response,
                      LoginRequest body
    ) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(body.getEmail(), body.getPassword());
        Authentication authentication = authenticationManager.authenticate(token);
        SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(authentication);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, request, response);
    }

    /**
     * Retrieves the currently authenticated user’s session information.
     *
     * @param request HTTP request for accessing session data
     * @return User object representing the current session user
     */
    @Override
    @Transactional
    public User getSession(HttpServletRequest request) {
        User authenticatedUser = SecurityUtil.getAuthenticatedUser();

        return this.userRepository.findByEmail(authenticatedUser.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    /**
     * Logs out the currently authenticated user, clearing the security context
     * associated with the session.
     *
     * @param request HTTP request for accessing the session
     * @param response HTTP response to update following logout
     */
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        this.logoutHandler.logout(request, response, authentication);
    }
}
