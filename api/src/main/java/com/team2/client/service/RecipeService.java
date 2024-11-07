package com.team2.client.service;


import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface RecipeService {
    List<RecipeDto> getAllRecipies();

    AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser);
}
