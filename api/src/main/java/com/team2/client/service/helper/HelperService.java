package com.team2.client.service.helper;


import com.team2.client.domain.Ingredient;
import com.team2.client.repository.IngredientRepository;
import org.springframework.stereotype.Service;

@Service
public class HelperService {
    private IngredientRepository ingredientRepository;

    public HelperService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Ingredient createIngredient(String ingredientName) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientName);
        this.ingredientRepository.saveAndFlush(ingredient);
        return ingredient;
    }
}
