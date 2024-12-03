package com.team2.client.service;


import com.team2.client.domain.Ingredient;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.UUID;

public interface RecipeService {
    List<RecipeDto> getAllRecipes();

    AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser);


    List<Object> getTypes(String type);


    RecipeDto getRecipeById(Long id);

    RecipeDto getRecipeByName(String name);

    void deleteFromRecipes(Long longs, String username);

    List<RecipeDto> getLoggedUserCreatedRecipes(String username);

    void toggleRecipePrivacy(Long recipeId);

    void deleteRecipe(Long recipeId);
}
