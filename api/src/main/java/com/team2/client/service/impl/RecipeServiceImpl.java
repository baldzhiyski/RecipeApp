package com.team2.client.service.impl;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.Recipe;
import com.team2.client.domain.RecipeIngredient;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.domain.enums.DietaryPreference;
import com.team2.client.domain.enums.MealType;
import com.team2.client.domain.enums.RecipeType;
import com.team2.client.exception.UserNotFound;
import com.team2.client.repository.IngredientRepository;
import com.team2.client.repository.RecipeRepository;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {
    private RecipeRepository repository;

    private IngredientRepository ingredientRepository;

    private UserRepository userRepository;
    private ModelMapper mapper;

    public RecipeServiceImpl(RecipeRepository repository, ModelMapper mapper,IngredientRepository ingredientRepository,UserRepository userRepository) {
        this.repository = repository;
        this.mapper = mapper;
        this.ingredientRepository=ingredientRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<RecipeDto> getAllRecipies() {
        return repository.findAll()
                .stream()
                .map(recipe -> mapper.map(recipe, RecipeDto.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser) {

        Recipe recipe = new Recipe();
        recipe.setRecipeName(addRecipeDTO.getRecipeName());
        recipe.setDescription(addRecipeDTO.getDescription());
        recipe.setInstructions(addRecipeDTO.getInstructions());
        recipe.setDishType(RecipeType.valueOf(addRecipeDTO.getDishType().toUpperCase()));
        recipe.setMealType(MealType.valueOf(addRecipeDTO.getMealType().toUpperCase()));
        recipe.setDietaryPreference(DietaryPreference.valueOf(addRecipeDTO.getDietaryPreference().toUpperCase()));

        List<RecipeIngredient> ingredientsForRecipe = addRecipeDTO.getIngredientsList().stream()
                .map(ingredientDto -> {
                    String ingredientDtoName = ingredientDto.getName().toLowerCase();
                    ingredientDtoName = ingredientDtoName.substring(0, 1).toUpperCase() + ingredientDtoName.substring(1);

                    Optional<Ingredient> byName = this.ingredientRepository.findByName(ingredientDtoName);

                    if(byName.isEmpty()){
                        Ingredient ingredient = new Ingredient();
                        ingredient.setName(ingredientDtoName);
                        this.ingredientRepository.saveAndFlush(ingredient);
                    }

                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setIngredient(this.ingredientRepository.findByName(ingredientDtoName).get());
                    recipeIngredient.setRecipe(recipe);
                    recipeIngredient.setUnit(ingredientDto.getUnit());
                    recipeIngredient.setAmount(ingredientDto.getAmount());


                    return recipeIngredient;
                }).toList();

        recipe.setRecipeIngredients(ingredientsForRecipe);
        recipe.setCreator(userRepository.findByEmail(loggedInUser.getUsername()).orElseThrow(() -> new UserNotFound("Unauthorized !")));

        this.repository.saveAndFlush(recipe);
        return  AddRecipeResponse.builder().recipeName(addRecipeDTO.getRecipeName()).build();
    }
}
