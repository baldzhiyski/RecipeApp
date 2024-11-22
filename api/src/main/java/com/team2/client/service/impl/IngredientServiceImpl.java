package com.team2.client.service.impl;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.dto.AllIngredientsDto;
import com.team2.client.domain.dto.IngredientDto;
import com.team2.client.repository.IngredientRepository;
import com.team2.client.service.IngredientService;
import com.team2.client.service.helper.HelperService;
import org.springframework.stereotype.Service;

@Service
public class IngredientServiceImpl  implements IngredientService {
    private IngredientRepository ingredientRepository;
    private HelperService helperService;

    public IngredientServiceImpl(IngredientRepository ingredientRepository, HelperService helperService) {
        this.ingredientRepository = ingredientRepository;
        this.helperService = helperService;
    }

    @Override
    public Ingredient addIngredient(IngredientDto newIngredient) {
        return this.helperService.createIngredient(newIngredient.getName());
    }

    @Override
    public AllIngredientsDto getAllIngredients() {
        return new AllIngredientsDto(ingredientRepository.findAll());
    }
}
