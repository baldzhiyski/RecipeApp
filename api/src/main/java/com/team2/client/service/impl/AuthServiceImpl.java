package com.team2.client.service.impl;



import com.team2.client.domain.User;
import com.team2.client.domain.dto.LoginRequest;
import com.team2.client.domain.dto.LoginResponse;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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

    private final JwtService jwtService;

    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    /**
     * Constructs an AuthServiceImpl instance, initializing dependencies and configuring
     * the security context repository.
     *
     * @param userRepository        Repository for User entity operations
     * @param authenticationManager Manager for handling authentication logic
     */
    public AuthServiceImpl(UserRepository userRepository, AuthenticationManager authenticationManager, JwtService jwtService) {
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }


    @Override
    public ResponseEntity<LoginResponse> login(
                      LoginRequest body
    ) throws AuthenticationException {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        body.getEmail(),
                        body.getPassword()
                )
        );


        User authenticatedUser = userRepository.findByEmail(body.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Cannot find user with email " + body.getEmail()));

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse =  LoginResponse.builder().token(jwtToken).expiresIn(jwtService.getExpirationTime()).build();

        return ResponseEntity.ok(loginResponse);
    }

    /**
     * Retrieves the currently authenticated user’s session information.
     *
     * @param request HTTP request for accessing session data
     * @return User object representing the current session user
     */
    @Override
    @Transactional
    public ResponseEntity<User> getSession(HttpServletRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
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
        String jwtToken = extractJwtFromRequest(request);

        // Add token to blacklist
        jwtService.blacklistToken(jwtToken);

        // Clear Security Context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        logoutHandler.logout(request, response, authentication);
    }

    private String extractJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
