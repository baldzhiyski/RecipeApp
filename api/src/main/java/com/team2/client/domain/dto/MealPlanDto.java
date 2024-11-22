package com.team2.client.domain.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MealPlanDto {

    private List<MealPlanRecipeDto> mealPlanRecipeDtos;
}
