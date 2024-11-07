package com.team2.client.service;


import com.team2.client.domain.Ingredient;
import com.team2.client.domain.Recipe;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface RecipeService {
    List<RecipeDto> getAllRecipies();

    AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser);


    List<Object> getTypes(String type);

    List<Ingredient> getAllIngredients();

    RecipeDto getRecipeById(Long id);

    RecipeDto getRecipeByName(String name);
}
