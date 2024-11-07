package com.team2.client.domain.dto;

import com.team2.client.domain.enums.DietaryPreference;
import com.team2.client.domain.enums.MealType;
import com.team2.client.domain.enums.RecipeType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RecipeDto {

    private RecipeType dishType;


    private MealType mealType; // Add meal type field

    private DietaryPreference dietaryPreference;

    private String recipeName;

    private String description;

    private String instructions;

    private String creatorUsername;
}
