package com.team2.client.restController;

import com.team2.client.domain.Recipe;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.service.RecipeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RecipeController {


    private RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/api/recipes")
    private ResponseEntity<List<RecipeDto>> getAllRecipes(){
        return ResponseEntity.ok(recipeService.getAllRecipies());
    }

}
