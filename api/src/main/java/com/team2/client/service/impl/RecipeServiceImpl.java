package com.team2.client.service.impl;

import com.team2.client.domain.*;
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
import com.team2.client.repository.*;
import com.team2.client.service.CloudinaryService;
import com.team2.client.service.RecipeService;
import com.team2.client.service.helper.HelperService;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {
    private final RecipeRepository recipeRepository;
    private RecipeRepository repository;

    private HelperService helperService;

    private CloudinaryService cloudinaryService;
    private IngredientRepository ingredientRepository;

    private RecipeIngredientRepository recipeIngredientRepository;

    private UserRepository userRepository;
    private ModelMapper mapper;

    private RatingRepository ratingRepository;

    public RecipeServiceImpl(RecipeRepository repository, HelperService helperService, CloudinaryService cloudinaryService, ModelMapper mapper, IngredientRepository ingredientRepository, UserRepository userRepository, RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, RatingRepository ratingRepository) {
        this.repository = repository;
        this.helperService = helperService;
        this.cloudinaryService = cloudinaryService;
        this.mapper = mapper;
        this.ingredientRepository=ingredientRepository;
        this.userRepository = userRepository;
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.ratingRepository = ratingRepository;
    }


    @Override
    @Transactional
    public AddRecipeResponse addRecipe(AddRecipeDTO addRecipeDTO, UserDetails loggedInUser, MultipartFile image) {
        // Check if recipe already exists
        Optional<Recipe> byRecipeName = this.repository.findByRecipeName(addRecipeDTO.getRecipeName());
        if (byRecipeName.isPresent()) {
            throw new RecipeExistsException("The recipe with the name " + addRecipeDTO.getRecipeName() + " already exists!");
        }

        String imageUrl = this.cloudinaryService.uploadPhoto(image,"recipe-images");


        // Create a new Recipe entity
        Recipe recipe = new Recipe();
        recipe.setIsPrivate(addRecipeDTO.getIsPrivate());
        recipe.setRecipeName(addRecipeDTO.getRecipeName());
        recipe.setDescription(addRecipeDTO.getDescription());
        recipe.setInstructions(addRecipeDTO.getInstructions());
        recipe.setDishType(RecipeType.valueOf(addRecipeDTO.getDishType().toUpperCase()));
        recipe.setMealType(MealType.valueOf(addRecipeDTO.getMealType().toUpperCase()));
        recipe.setDietaryPreference(DietaryPreference.valueOf(addRecipeDTO.getDietaryPreference().toUpperCase()));
        recipe.setEstimatedTime(addRecipeDTO.getEstimatedTime());
        recipe.setImageUrl(imageUrl);

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
        User creator = getUser(userRepository.findByEmail(loggedInUser.getUsername()));
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
        Recipe recipe = getRecipeId(id);
        User user = getUser(this.userRepository.findByEmail(username));

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
        User user = getUser(userRepository.findByEmail(username));

        return user.getCreatedRecipes()
                .stream()
                .map(this::mapRecipeToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void toggleRecipePrivacy(Long recipeId) {
        Recipe recipe = getRecipeId(recipeId);

        recipe.setIsPrivate(!recipe.getIsPrivate());
        this.recipeRepository.saveAndFlush(recipe);

    }

    @Override
    @Transactional
    public void deleteRecipe(Long recipeId) {
        Recipe recipe = getRecipeId(recipeId);
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

    @Override
    public void addRating(Long recipeId, Long stars, String username) {
        // Retrieve the recipe using the recipe ID
        Recipe recipe = getRecipeId(recipeId);

        // Retrieve the user based on the username
        User user = getUser(this.userRepository.findByEmail(username));

        // Check if the user has already rated this recipe
        Optional<Rating> existingRating = this.ratingRepository.findByUserAndRecipe(user, recipe);
        Rating rating;

        if (existingRating.isPresent()) {
            // Update the existing rating
             rating = existingRating.get();
            rating.setStars(stars);
            this.ratingRepository.saveAndFlush(rating);
        } else {
            // Create a new rating
             rating = new Rating();
            rating.setStars(stars);
            rating.setRecipe(recipe);
            rating.setUser(user);

            // Save the new rating
            this.ratingRepository.saveAndFlush(rating);
        }
        recipe.getRatings().add(rating);
        this.recipeRepository.saveAndFlush(recipe);

    }

    @Override
    public Long getRating(Long recipeId, String username) {

        // Retrieve the recipe using the recipe ID
        Recipe recipe = getRecipeId(recipeId);

        // Retrieve the user based on the username
        User user = getUser(this.userRepository.findByEmail(username));

        Optional<Rating> byUserAndRecipe = this.ratingRepository.findByUserAndRecipe(user, recipe);

        return byUserAndRecipe.map(Rating::getStars).orElse(null);

    }

    @Override
    public Double getAvg(Long recipeId) {
        // Retrieve the recipe using the recipe ID
        Recipe recipe = getRecipeId(recipeId);

        return recipe.getAverageRating();
    }

    @Override
    public Set<RecipeDto> getTopRatedRecipes() {
        // Fetch all recipes from the repository
        Set<RecipeDto> recipeDtos = this.recipeRepository.findAll()
                .stream()
                .filter(recipe -> !recipe.getIsPrivate())
                // Sort the recipes by average rating in descending order
                .sorted((recipe1, recipe2) -> Double.compare(
                        recipe2.getAverageRating(), recipe1.getAverageRating()))
                // Limit to the top 3 recipes
                .limit(3)
                // Map the top recipes to RecipeDto objects
                .map(recipe -> this.mapper.map(recipe, RecipeDto.class))
                // Collect the results into a Set (or List if order matters)
                .collect(Collectors.toSet());
        return recipeDtos;
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
        mappedRecipe.setAverageRating(recipe.getAverageRating());
        mappedRecipe.setRecipeIngredients(mappedIngredients);

        return mappedRecipe;
    }


    private Recipe getRecipeId(Long recipeId) {
        return recipeRepository.findById(recipeId).orElseThrow(() -> new RecipeNotFoundException("Recipe with id :  " + recipeId + " is not in the DB !"));
    }

    private User getUser(Optional<User> user) {
        return user.orElseThrow(() -> new UserNotFound("Unauthorized!"));
    }

}
