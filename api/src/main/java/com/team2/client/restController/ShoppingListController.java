package com.team2.client.restController;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.ShoppingList;
import com.team2.client.domain.dto.IngredientDto;
import com.team2.client.domain.dto.ShoppingListDto;
import com.team2.client.service.IngredientService;
import com.team2.client.service.RecipeService;
import com.team2.client.service.ShoppingListService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Tag(name = "Shopping List Endpoints", description = "Managing ingredients for the shopping list.")
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

    @Operation(summary = "Add ingredient to the shopping list of the logged user",
            description = "Adds an ingredient to the authenticated user's shopping list.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ingredient successfully added"),
            @ApiResponse(responseCode = "404", description = "Ingredient or user not found")
    })
    @PostMapping("/{ingredientId}/add-to-list")
    public ResponseEntity<ShoppingListDto> addIngredientToTheList(
            @Parameter(description = "ID of the ingredient to add", example = "1")
            @PathVariable("ingredientId") Long ingredientName,

            @AuthenticationPrincipal UserDetails userDetails) {

        ShoppingListDto updatedShoppingList = shoppingListService.addIngredientToList(ingredientName, userDetails.getUsername());
        return ResponseEntity.ok(updatedShoppingList);
    }

    @Operation(summary = "Remove ingredient from the shopping list",
            description = "Removes an ingredient from the authenticated user's shopping list.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ingredient successfully removed"),
            @ApiResponse(responseCode = "404", description = "Ingredient or user not found")
    })
    @DeleteMapping("/{ingredientId}/remove-ingredient")
    public ResponseEntity<ShoppingListDto> deleteIngredientFromList(
            @Parameter(description = "ID of the ingredient to remove", example = "1")
            @PathVariable("ingredientId") Long ingredientId,

            @AuthenticationPrincipal UserDetails userDetails) {

        ShoppingListDto updatedShoppingList = shoppingListService.removeIngredientFromList(ingredientId, userDetails.getUsername());
        return ResponseEntity.ok(updatedShoppingList);
    }
}
