package com.team2.client.service;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.dto.IngredientDto;

import java.util.List;

public interface IngredientService {
    Ingredient addIngredient(IngredientDto newIngredient);

    List<Ingredient> getAllIngredients();
}
