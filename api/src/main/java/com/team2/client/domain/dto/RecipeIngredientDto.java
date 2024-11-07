package com.team2.client.domain.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class RecipeIngredientDto {

    private double amount;


    private String unit;

    private String ingredientName;
}
