package com.team2.client.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.team2.client.domain.User;
import com.team2.client.domain.enums.DietaryPreference;
import com.team2.client.domain.enums.MealType;
import com.team2.client.domain.enums.RecipeType;
import com.team2.client.validation.annotation.ValidFile;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class AddRecipeDTO {


    @JsonProperty("ingredients")
    private List<IngredientDto> ingredientsList;

    @NotBlank(message = "{recipe.required}")
    private String  dishType;

    @NotBlank(message = "{recipe.required}")
    private String mealType; // Add meal type field

    @NotBlank(message = "{recipe.required}")
    private String dietaryPreference;

    @NotBlank(message = "{recipe.required}")
    private String recipeName;

    @NotBlank(message = "{recipe.required}")
    private String description;

    @NotBlank(message = "{recipe.required}")
    private String instructions;

    private Integer estimatedTime;

    private Boolean isPrivate;
}
