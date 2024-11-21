package com.team2.client.service.helper;


import com.team2.client.domain.Ingredient;
import com.team2.client.domain.MealPlan;
import com.team2.client.domain.dto.MealPlanDto;
import com.team2.client.domain.dto.MealPlanRecipeDto;
import com.team2.client.repository.IngredientRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HelperService {
    private IngredientRepository ingredientRepository;
    private ModelMapper mapper;

    public HelperService(IngredientRepository ingredientRepository, ModelMapper mapper) {
        this.ingredientRepository = ingredientRepository;
        this.mapper = mapper;
    }

    public Ingredient createIngredient(String ingredientName) {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(ingredientName);
        this.ingredientRepository.saveAndFlush(ingredient);
        return ingredient;
    }

    public MealPlanDto getMealPlanDto(MealPlan mealPlan){
        List<MealPlanRecipeDto> listMappedMealPlanRecipes = mealPlan.getMealPlanRecipes().stream()
                .map(mealPlanRecipe1 -> this.mapper.map(mealPlanRecipe1, MealPlanRecipeDto.class))
                .toList();

        MealPlanDto mealPlanDto = new MealPlanDto();
        mealPlanDto.setMealPlanRecipeDtos(listMappedMealPlanRecipes);

        return mealPlanDto;
    }
}
