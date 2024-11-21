package com.team2.client.restController;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.ShoppingList;
import com.team2.client.domain.dto.IngredientDto;
import com.team2.client.domain.dto.ShoppingListDto;
import com.team2.client.service.IngredientService;
import com.team2.client.service.RecipeService;
import com.team2.client.service.ShoppingListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShoppingListController {
    private final IngredientService ingredientService;

    private final ShoppingListService shoppingListService;

    public ShoppingListController(IngredientService ingredientService, ShoppingListService shoppingListService) {
        this.ingredientService = ingredientService;
        this.shoppingListService = shoppingListService;
    }

    @Operation(summary = "Get all ingredients", description = "Retrieve a list of all available ingredients.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "List of all ingredients",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Ingredient.class)))
    })
    @GetMapping("/api/ingredients")
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return ResponseEntity.ok(ingredientService.getAllIngredients());
    }

    @Operation(summary = "Add a new ingredient", description = "Allow users to add a new ingredient if it is not already in the database.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Ingredient added successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Ingredient.class)))
    })
    @PostMapping("/api/ingredients/add")
    public ResponseEntity<Ingredient> addIngredient(@RequestBody IngredientDto newIngredient) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ingredientService.addIngredient(newIngredient));
    }

    @PostMapping("/{ingredientId}/add-to-list")
    public ResponseEntity<ShoppingListDto> addIngredientToTheList(
            @PathVariable("ingredientId") Long ingredientId, // Ingredient ID from the URL
            @AuthenticationPrincipal UserDetails userDetails) {

        // Call service method to add ingredient to user's shopping list
        ShoppingListDto updatedShoppingList = shoppingListService.addIngredientToList(ingredientId, userDetails.getUsername());

        // Return the updated shopping list
        return ResponseEntity.ok(updatedShoppingList);
    }

    // Remove Ingredient from Shopping List
    @DeleteMapping("/{ingredientId}/remove")
    public ResponseEntity<ShoppingListDto> deleteIngredientFromList(
            @PathVariable("ingredientId") Long ingredientId, // Ingredient ID from the URL
            @AuthenticationPrincipal UserDetails userDetails) {

        // Call service method to remove ingredient from user's shopping list
        ShoppingListDto updatedShoppingList = shoppingListService.removeIngredientFromList(ingredientId, userDetails.getUsername());

        // Return the updated shopping list
        return ResponseEntity.ok(updatedShoppingList);
    }
}
