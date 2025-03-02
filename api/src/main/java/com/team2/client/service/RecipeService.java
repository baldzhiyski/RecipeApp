package com.team2.client.service;


import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

public interface RecipeService {
    List<RecipeDto> getAllRecipes();

    AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser, MultipartFile image);


    List<Object> getTypes(String type);


    RecipeDto getRecipeById(Long id);

    RecipeDto getRecipeByName(String name);

    void deleteFromRecipes(Long longs, String username);

    List<RecipeDto> getLoggedUserCreatedRecipes(String username);

    void toggleRecipePrivacy(Long recipeId);

    void deleteRecipe(Long recipeId);

    long countRecipes();

    List<Object[]> countRecipesByMealType();

    List<Object[]> countRecipesByDietaryPreference();

    List<Object[]> countRecipesByType();

    void addRating(Long recipeId, Long stars, String username);

    Long getRating(Long recipeId, String username);

    Double getAvg(Long recipeId);

    Set<RecipeDto> getTopRatedRecipes();

    Set<RecipeDto> getFavouriteRecipes(String username);

    void removeFromFavourites(String username, Long id);

    void addToFavourites(String username, Long id);

    Void sendRecipe(Long recipeId, Long userId);

    Void declineRecipe(Long recipeId, Long userId);

    List<RecipeDto> getLoggedUserPendingRecipes(String username);
}
