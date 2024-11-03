package com.team2.client.restController;

import com.team2.client.domain.User;
import com.team2.client.domain.dto.UserRegisterDto;
import com.team2.client.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/users/register")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRegisterDto userRegisterDto){
        User user = userService.registerUser(userRegisterDto);
        return ResponseEntity.ok(user);
    }
}
