package com.team2.client.restController;

import com.team2.client.domain.dto.UserDto;
import com.team2.client.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users-count")
    public Long getTotalUsers() {
        return userService.countUsers();
    }

    @GetMapping("/registrations-by-week")
    public Map<String, Long> getRegistrationsByWeek() {
        return userService.getRegistrationsByWeek();
    }


    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers(@AuthenticationPrincipal UserDetails userDetails){
        return ResponseEntity.ok(this.userService.getCurrentUsers(userDetails.getUsername()));
    }
}
