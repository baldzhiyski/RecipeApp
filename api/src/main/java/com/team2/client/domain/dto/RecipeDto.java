package com.team2.client.domain.dto;

import com.team2.client.domain.RecipeIngredient;
import com.team2.client.domain.enums.DietaryPreference;
import com.team2.client.domain.enums.MealType;
import com.team2.client.domain.enums.RecipeType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RecipeDto {

    private Long id;
    private List<RecipeIngredientDto> recipeIngredients;

    private RecipeType dishType;

    private boolean isPrivate;

    private Integer estimatedTime;
    private MealType mealType; // Add meal type field

    private DietaryPreference dietaryPreference;

    private String recipeName;

    private String description;

    private String instructions;

    private String creatorUsername;

    private Double averageRating;
}
