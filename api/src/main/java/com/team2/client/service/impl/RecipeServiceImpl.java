package com.team2.client.service.impl;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.Recipe;
import com.team2.client.domain.RecipeIngredient;
import com.team2.client.domain.User;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.dto.AddRecipeResponse;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.domain.dto.RecipeIngredientDto;
import com.team2.client.domain.enums.DietaryPreference;
import com.team2.client.domain.enums.MealType;
import com.team2.client.domain.enums.RecipeType;
import com.team2.client.exception.InvalidTypeProvided;
import com.team2.client.exception.RecipeExistsException;
import com.team2.client.exception.RecipeNotFoundException;
import com.team2.client.exception.UserNotFound;
import com.team2.client.repository.IngredientRepository;
import com.team2.client.repository.RecipeIngredientRepository;
import com.team2.client.repository.RecipeRepository;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.RecipeService;
import com.team2.client.service.helper.HelperService;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private RecipeRepository repository;

    private HelperService helperService;

    private IngredientRepository ingredientRepository;

    private RecipeIngredientRepository recipeIngredientRepository;

    private UserRepository userRepository;
    private ModelMapper mapper;

    public RecipeServiceImpl(RecipeRepository repository, HelperService helperService, ModelMapper mapper, IngredientRepository ingredientRepository, UserRepository userRepository, RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository) {
        this.repository = repository;
        this.helperService = helperService;
        this.mapper = mapper;
        this.ingredientRepository=ingredientRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
    }


    @Override
    @Transactional
    public AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser) {
        // Check if recipe already exists
        Optional<Recipe> byRecipeName = this.repository.findByRecipeName(addRecipeDTO.getRecipeName());
        if (byRecipeName.isPresent()) {
            throw new RecipeExistsException("The recipe with the name " + addRecipeDTO.getRecipeName() + " already exists!");
        }


        // Create a new Recipe entity
        Recipe recipe = new Recipe();
        recipe.setIsPrivate(addRecipeDTO.getIsPrivate());
        recipe.setRecipeName(addRecipeDTO.getRecipeName());
        recipe.setDescription(addRecipeDTO.getDescription());
        recipe.setInstructions(addRecipeDTO.getInstructions());
        recipe.setDishType(RecipeType.valueOf(addRecipeDTO.getDishType().toUpperCase()));
        recipe.setMealType(MealType.valueOf(addRecipeDTO.getMealType().toUpperCase()));
        recipe.setDietaryPreference(DietaryPreference.valueOf(addRecipeDTO.getDietaryPreference().toUpperCase()));

        // Handle ingredients list
        List<RecipeIngredient> ingredientsForRecipe = addRecipeDTO.getIngredientsList().stream()
                .map(ingredientDto -> {


                    // Check if ingredient exists, otherwise create a new one
                    Ingredient ingredient = this.ingredientRepository.findByName(this.helperService.convertNameIngredient(ingredientDto.getName()))
                            .orElseGet(() -> helperService.createIngredient(ingredientDto.getName()));
                    this.ingredientRepository.saveAndFlush(ingredient);

                    // Create RecipeIngredient object
                    RecipeIngredient recipeIngredient = new RecipeIngredient();
                    recipeIngredient.setIngredient(ingredient);
                    recipeIngredient.setRecipe(recipe);
                    recipeIngredient.setUnit(ingredientDto.getUnit());
                    recipeIngredient.setAmount(ingredientDto.getAmount());

                    return recipeIngredient;
                }).toList();

        recipe.setRecipeIngredients(ingredientsForRecipe);

        // Set the creator for the recipe
        User creator = userRepository.findByEmail(loggedInUser.getUsername())
                .orElseThrow(() -> new UserNotFound("Unauthorized!"));
        recipe.setCreator(creator);

        // Save recipe to the repository
        this.repository.saveAndFlush(recipe);


        // Save ingredients to the database
        this.recipeIngredientRepository.saveAllAndFlush(ingredientsForRecipe);

        // Return response with recipe name
        return AddRecipeResponse.builder()
                .recipeName(addRecipeDTO.getRecipeName())
                .build();
    }

    @Override
    public List<Object> getTypes(String type) {
        switch (type.toUpperCase()){
            case "MEAL" -> {
                return List.of(MealType.values());
            }
            case "RECIPE" -> {
                return List.of(RecipeType.values());
            }
            case "DIETARY" -> {
                return List.of(DietaryPreference.values());
            }
            default -> {
                throw new InvalidTypeProvided("No such type : " + type);
            }
        }
    }

    @Override
    public RecipeDto getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new RecipeNotFoundException("No such recipe found in the db !"));

        List<RecipeIngredientDto> mappedIngredients = recipe.getRecipeIngredients().stream()
                .map(recipeIngredient -> this.mapper.map(recipeIngredient, RecipeIngredientDto.class))
                .toList();

        RecipeDto mappedRecipe = mapper.map(recipe, RecipeDto.class);

        mappedRecipe.setRecipeIngredients(mappedIngredients);

        return mappedRecipe;

    }

    @Override
    public RecipeDto getRecipeByName(String name) {
        Recipe recipe = recipeRepository.findByRecipeName(name).orElseThrow(() -> new RecipeNotFoundException("No such recipe found in the db !"));

        List<RecipeIngredientDto> mappedIngredients = recipe.getRecipeIngredients().stream()
                .map(recipeIngredient -> this.mapper.map(recipeIngredient, RecipeIngredientDto.class))
                .toList();

        RecipeDto mappedRecipe = mapper.map(recipe, RecipeDto.class);

        mappedRecipe.setRecipeIngredients(mappedIngredients);
        return mappedRecipe;
    }

    @Override
    @Transactional
    public void deleteFromRecipes(Long id, String username) {
        Recipe recipe = recipeRepository.findById(id).orElseThrow(() -> new RecipeNotFoundException("Recipe with id :  " + id + " is not in the DB !"));
        User user = this.userRepository.findByUsername(username).orElseThrow(() -> new UserNotFound("Unauthorized!"));

        user.getCreatedRecipes().remove(recipe);
        recipe.setCreator(null);

        this.userRepository.saveAndFlush(user);
        this.recipeRepository.delete(recipe);

    }

    @Override
    public List<RecipeDto> getAllRecipes() {
        return repository.findAll()
                .stream()
                .filter(recipe -> !recipe.getIsPrivate())
                .map(this::mapRecipeToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RecipeDto> getLoggedUserCreatedRecipes(String username) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFound("Unauthorized!"));

        return user.getCreatedRecipes()
                .stream()
                .map(this::mapRecipeToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void toggleRecipePrivacy(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("Recipe with id :  " + recipeId + " is not in the DB !"));

        recipe.setIsPrivate(!recipe.getIsPrivate());
        this.recipeRepository.saveAndFlush(recipe);

    }

    @Override
    @Transactional
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("Recipe with id :  " + recipeId + " is not in the DB !"));
        this.recipeIngredientRepository.deleteAll(recipe.getRecipeIngredients());
        this.recipeRepository.delete(recipe);

    }

    @Override
    public long countRecipes() {
        return this.recipeRepository.count();
    }

    @Override
    public List<Object[]> countRecipesByMealType() {
        return this.recipeRepository.countRecipesByMealType();
    }

    @Override
    public List<Object[]> countRecipesByDietaryPreference() {
        return this.recipeRepository.countRecipesByDietaryPreference();
    }

    @Override
    public List<Object[]> countRecipesByType() {
        return this.recipeRepository.countRecipesByType();
    }

    /**
     * Helper method to map Recipe to RecipeDto.
     */
    private RecipeDto mapRecipeToDto(Recipe recipe) {
        List<RecipeIngredientDto> mappedIngredients = recipe.getRecipeIngredients()
                .stream()
                .map(recipeIngredient -> mapper.map(recipeIngredient, RecipeIngredientDto.class))
                .toList();

        RecipeDto mappedRecipe = mapper.map(recipe, RecipeDto.class);
        mappedRecipe.setRecipeIngredients(mappedIngredients);

        return mappedRecipe;
    }


}
