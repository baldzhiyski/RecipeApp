package com.team2.client.service.impl;

import com.team2.client.domain.MealPlan;
import com.team2.client.domain.ShoppingList;
import com.team2.client.domain.User;
import com.team2.client.domain.dto.UserRegisterDto;
import com.team2.client.domain.enums.Role;
import com.team2.client.exception.UserNotFound;
import com.team2.client.repository.ShoppingListRepository;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.CloudinaryService;
import com.team2.client.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private ModelMapper mapper;

    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;

    private CloudinaryService cloudinaryService;

    private ShoppingListRepository shoppingListRepository;
    public UserServiceImpl(ModelMapper mapper, PasswordEncoder passwordEncoder, UserRepository userRepository, CloudinaryService cloudinaryService, ShoppingListRepository shoppingListRepository) {
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.cloudinaryService = cloudinaryService;
        this.shoppingListRepository = shoppingListRepository;
    }

    @Override
    @Transactional
    public User registerUser(UserRegisterDto userRegisterDto) {
        User mapped = this.mapper.map(userRegisterDto, User.class);
        mapped.setRoleType(Role.USER);
        mapped.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        mapped.setCreatedRecipes(new ArrayList<>());
        mapped.setUuid(UUID.randomUUID());


        ShoppingList shoppingList = new ShoppingList();
        shoppingList.setIngredients(new ArrayList<>());
        mapped.setShoppingList(shoppingList);

        // TODO : Handle logic with Meal Plan


        this.shoppingListRepository.save(shoppingList);
        this.userRepository.saveAndFlush(mapped);

        return mapped;
    }

    @Override
    public void uploadProfileImage(String email, MultipartFile profileImage) {
        User user = this.userRepository.findByEmail(email).orElseThrow(() -> new UserNotFound("No such user !"));

        // SAVE THE file ! ;
        String imageUrl = cloudinaryService.uploadPhoto(profileImage, "users-accounts-photos");
        user.setProfileImageUrl(imageUrl);
        this.userRepository.saveAndFlush(user);
    }
}
