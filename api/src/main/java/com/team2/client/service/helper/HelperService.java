package com.team2.client.service.helper;


import com.team2.client.domain.Ingredient;
import com.team2.client.domain.MealPlan;
import com.team2.client.domain.dto.MealPlanDto;
import com.team2.client.domain.dto.MealPlanRecipeDto;
import com.team2.client.repository.IngredientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HelperService {
    private IngredientRepository ingredientRepository;
    private ModelMapper mapper;

    public HelperService(IngredientRepository ingredientRepository, ModelMapper mapper) {
        this.ingredientRepository = ingredientRepository;
        this.mapper = mapper;
    }

    public Ingredient createIngredient(String ingredientName) {
        String result = convertNameIngredient(ingredientName);
        Optional<Ingredient> byName = this.ingredientRepository.findByName(result);
        if (byName.isEmpty()) {
            Ingredient ingredient = new Ingredient();
            ingredient.setName(result);
            this.ingredientRepository.saveAndFlush(ingredient);
            return ingredient;
        }
        return byName.get();
    }

    public  String convertNameIngredient(String ingredientName) {
        return ingredientName.toLowerCase().substring(0, 1).toUpperCase() + ingredientName.toLowerCase().substring(1);
    }

    public MealPlanDto getMealPlanDto(MealPlan mealPlan) {
        List<MealPlanRecipeDto> listMappedMealPlanRecipes = mealPlan.getMealPlanRecipes().stream()
                .map(mealPlanRecipe1 -> this.mapper.map(mealPlanRecipe1, MealPlanRecipeDto.class))
                .toList();

        MealPlanDto mealPlanDto = new MealPlanDto();
        mealPlanDto.setMealPlanRecipeDtos(listMappedMealPlanRecipes);

        return mealPlanDto;
    }
}
