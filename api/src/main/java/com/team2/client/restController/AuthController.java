package com.team2.client.restController;

import com.team2.client.domain.User;
import com.team2.client.domain.dto.LoginRequest;
import com.team2.client.domain.dto.LoginResponse;
import com.team2.client.domain.dto.UserRegisterDto;
import com.team2.client.service.AuthService;
import com.team2.client.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
public class AuthController {

    private final AuthService authService;
    private UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/api/auth/register")
    public ResponseEntity<User> createUser(@RequestBody @Valid UserRegisterDto userRegisterDto){
        User savedUser = userService.registerUser(userRegisterDto);
        return ResponseEntity.ok(savedUser);
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest body) throws org.springframework.security.core.AuthenticationException {
        ResponseEntity<LoginResponse> loginResponse = authService.login(body);

        return ResponseEntity.ok(loginResponse);
    }

    @GetMapping("/api/auth/me")
    public ResponseEntity<User> getSession(HttpServletRequest request) {
        return authService.getSession(request);
    }

    @PostMapping("/api/auth/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseEntity.ok().build();
    }

    /**
     * This endpoint should be invoked by the frontend to get the CSRF token.
     */
    @GetMapping("/api/auth/csrf")
    public ResponseEntity<?> csrf() {
        return ResponseEntity.ok().build();
    }
}