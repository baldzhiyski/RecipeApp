package com.team2.client.service;

import com.team2.client.domain.dto.MealPlanDto;

import java.time.DayOfWeek;

public interface MealPlanService {
    MealPlanDto createWeeklyMealPlan(String username);
    MealPlanDto addRecipeToDay(String username, DayOfWeek dayOfWeek, Long recipeId);

    MealPlanDto removeRecipe(String username, DayOfWeek dayOfWeek, Long recipeId);
}