package com.team2.client.restController;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.exception.RecipeNotFoundException;
import com.team2.client.service.RecipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.*;

@RestController
@Tag(name = "Recipe Endpoints", description = "Managing recipes and ingredients.")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @Operation(summary = "Get all recipes", description = "Retrieve a list of all recipes.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of all recipes",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RecipeDto.class)))
    })
    @GetMapping("/api/recipes")
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @Operation(summary = "Add a new recipe", description = "Create a new recipe entry.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recipe added successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddRecipeResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input data",
                    content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"error\": \"Validation failed\"}")))
    })
    @PostMapping("/api/recipes/add")
    public ResponseEntity<AddRecipeResponse> addRecipe(
            @RequestBody(description = "Details of the recipe to add", required = true,
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AddRecipeDTO.class),
                            examples = @ExampleObject(value = "{\"name\":\"Green Smoothie\",\"description\":\"Healthy green smoothie.\",\"mealType\":\"BREAKFAST\",\"dishType\":\"APPETIZER\",\"dietaryPreference\":\"VEGETARIAN\",\"ingredients\":[{\"name\":\"Spinach\",\"amount\":\"1\" , \"unit\":\"cup\"},{\"name\":\"Banana\",\"amount\":\"500\",\"unit\" :\"grams\"}]}")))
            @org.springframework.web.bind.annotation.RequestBody @Valid AddRecipeDTO addRecipeDTO,
            @AuthenticationPrincipal UserDetails loggedInUser) {
        return ResponseEntity.ok(recipeService.addRecipe(addRecipeDTO, loggedInUser));
    }

    @Operation(summary = "Get recipes by type", description = "Retrieve recipes by their meal type.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recipes of the specified type",
                    content = @Content(mediaType = "application/json"))
    })
    @GetMapping("/api/recipes/types/{type}")
    public ResponseEntity<List<Object>> getTypes(@PathVariable String type) {
        return ResponseEntity.ok(recipeService.getTypes(type));
    }


    @Operation(summary = "Get recipe by ID", description = "Retrieve a specific recipe by its unique ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recipe details",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RecipeDto.class))),
            @ApiResponse(responseCode = "404", description = "Recipe not found",
                    content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"error\": \"Recipe not found\"}")))
    })
    @GetMapping("/api/recipe/{id}")
    public ResponseEntity<RecipeDto> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @Operation(summary = "Get recipe by name", description = "Retrieve a specific recipe by its name.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recipe details",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = RecipeDto.class))),
            @ApiResponse(responseCode = "404", description = "Recipe not found",
                    content = @Content(mediaType = "application/json", examples = @ExampleObject(value = "{\"error\": \"Recipe not found\"}")))
    })
    @GetMapping("/api/recipe/byName/{recipeName}")
    public ResponseEntity<RecipeDto> getRecipeByName(@PathVariable String recipeName) {
        return ResponseEntity.ok(recipeService.getRecipeByName(recipeName));
    }

    @Operation(summary = "Get recipes created by the logged-in user",
            description = "Retrieve a list of recipes created by the currently authenticated user.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of user's recipes",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = RecipeDto.class)))
    })
    @GetMapping("/api/my-recipes")
    public ResponseEntity<List<RecipeDto>> getMyRecipes(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(recipeService.getLoggedUserCreatedRecipes(userDetails.getUsername()));
    }

    @Operation(summary = "Delete recipes from user's collection",
            description = "Delete specific recipes from the user's collection based on the provided recipe IDs.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "All recipes deleted successfully"),
            @ApiResponse(responseCode = "206", description = "Some recipes failed to delete",
                    content = @Content(mediaType = "application/json",
                            examples = @ExampleObject(value = "{\"successfulDeletes\":[1,2],\"errors\":{\"3\":\"Recipe not found\"}}")))
    })
    @DeleteMapping("/api/delete-recipe")
    public ResponseEntity<Map<String, Object>> deleteRecipeFromCollection(
            @org.springframework.web.bind.annotation.RequestBody ArrayList<Long> recipesIds,
            @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        List<Long> successfulDeletes = new ArrayList<>();
        Map<Long, String> errors = new HashMap<>();

        for (Long recipeId : recipesIds) {
            try {
                this.recipeService.deleteFromRecipes(recipeId, username);
                successfulDeletes.add(recipeId);
            } catch (RecipeNotFoundException e) {
                errors.put(recipeId, e.getMessage());
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("successfulDeletes", successfulDeletes);
        response.put("errors", errors);

        if (errors.isEmpty()) {
            return new ResponseEntity<>(response, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(response, HttpStatus.PARTIAL_CONTENT);
        }
    }

    @Operation(summary = "Toggle recipe privacy", description = "Switch a recipe's privacy between private and public.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Successfully updated recipe privacy status")
    })
    @PutMapping("/api/recipes/{recipeId}/toggle-privacy")
    public ResponseEntity<Void> togglePrivacy(@PathVariable Long recipeId) {
        recipeService.toggleRecipePrivacy(recipeId);
        return ResponseEntity.ok().build();
    }


    @Operation(summary = "Delete recipe", description = "Delete a recipe created by the logged-in user.")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Successfully deleted recipe")
    })
    @DeleteMapping("/api/recipes/{recipeId}")
    public ResponseEntity<Void> deleteRecipe(@PathVariable Long recipeId) {
        recipeService.deleteRecipe(recipeId);
        return ResponseEntity.noContent().build();
    }




}
