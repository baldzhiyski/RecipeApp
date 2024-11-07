package com.team2.client.restController;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.Recipe;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.domain.enums.MealType;
import com.team2.client.service.RecipeService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RecipeController {


    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/api/recipes")
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipies());
    }

    @PostMapping("/api/recipes/add")
    public ResponseEntity<AddRecipeResponse> addRecipe(@RequestBody @Valid AddRecipeDTO addRecipeDTO,
                                                       @AuthenticationPrincipal UserDetails loggedInUser) {
        return ResponseEntity.ok(recipeService.addRecipe(addRecipeDTO, loggedInUser));
    }

    @GetMapping("/api/recipes/types/{type}")
    public ResponseEntity<List<Object>> getTypes(@PathVariable String type) {
        return ResponseEntity.ok(recipeService.getTypes(type));
    }

    @GetMapping("/api/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return ResponseEntity.ok(recipeService.getAllIngredients());
    }

    @GetMapping("/api/recipe/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @GetMapping("/api/recipe/{recipeName}")
    public ResponseEntity<Recipe> getRecipeByName(@PathVariable String recipeName) {
        return ResponseEntity.ok(recipeService.getRecipeByName(recipeName));
    }


}
