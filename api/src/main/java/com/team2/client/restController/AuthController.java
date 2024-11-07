package com.team2.client.restController;

import com.team2.client.domain.User;
import com.team2.client.domain.dto.LoginRequest;
import com.team2.client.domain.dto.LoginResponse;
import com.team2.client.domain.dto.UserRegisterDto;
import com.team2.client.service.AuthService;
import com.team2.client.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller responsible for user authentication, including login, registration, session retrieval, and logout.
 */
@RestController
@Tag(name = "Authentication", description = "APIs for user authentication, registration, session management, and logout")
@Slf4j
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    /**
     * Register a new user with required details such as username, password, and email.
     *
     * @param userRegisterDto The user registration details.
     * @return A response containing the registered user details.
     */
    @Operation(
            summary = "Register a new user",
            description = "Creates a new user by providing required registration details like username, email, password, and profile image.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "User registration details.",
                    required = true,
                    content = @Content(schema = @Schema(implementation = UserRegisterDto.class))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "User registered successfully",
                            content = @Content(schema = @Schema(implementation = User.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid data provided during registration")
            }
    )
    @PostMapping("/api/auth/register")
    public ResponseEntity<User> createUser(@RequestBody @Valid UserRegisterDto userRegisterDto) {
        User savedUser = userService.registerUser(userRegisterDto);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * Log in with the provided email and password.
     *
     * @param body Login request containing email and password.
     * @return A response containing a JWT token and expiration time if successful.
     */
    @Operation(
            summary = "Login user",
            description = "Allows a user to log in using email and password. Returns a JWT token and expiration time on successful login.",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Login credentials including email and password.",
                    required = true,
                    content = @Content(schema = @Schema(implementation = LoginRequest.class))
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Login successful with JWT token and expiration time",
                            content = @Content(schema = @Schema(implementation = LoginResponse.class))),
                    @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid credentials")
            }
    )
    @PostMapping("/api/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest body) throws org.springframework.security.core.AuthenticationException {
        return authService.login(body);
    }

    /**
     * Retrieve the current user's session details.
     *
     * @param request The HTTP request object containing the session details.
     * @return A response containing the current user's details.
     */
    @Operation(
            summary = "Get current user session",
            description = "Retrieves the currently authenticated user's details (e.g., username, email, profile).",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Session details fetched successfully",
                            content = @Content(schema = @Schema(implementation = User.class))),
                    @ApiResponse(responseCode = "401", description = "Unauthorized: User is not logged in")
            }
    )
    @GetMapping("/api/auth/me")
    public ResponseEntity<User> getSession(HttpServletRequest request) {
        return authService.getSession(request);
    }

    /**
     * Log out the currently authenticated user by invalidating their session.
     *
     * @param request  The HTTP request object.
     * @param response The HTTP response object.
     * @return A response indicating successful logout.
     */
    @Operation(
            summary = "Logout user",
            description = "Logs the user out and invalidates the session.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Logout successful"),
                    @ApiResponse(responseCode = "400", description = "Error during logout")
            }
    )
    @PostMapping("/api/auth/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response) {
        authService.logout(request, response);
        return ResponseEntity.ok().build();
    }
}
