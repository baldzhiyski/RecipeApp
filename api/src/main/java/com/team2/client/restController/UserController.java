package com.team2.client.restController;

import com.team2.client.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
