package com.team2.client.service.impl;

import com.team2.client.domain.MealPlan;
import com.team2.client.domain.MealPlanRecipe;
import com.team2.client.domain.Recipe;
import com.team2.client.domain.User;
import com.team2.client.domain.dto.MealPlanDto;
import com.team2.client.domain.dto.MealPlanRecipeDto;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.exception.AlreadyAddedRecipeException;
import com.team2.client.exception.NotExistingRecipeInTheFollowingDay;
import com.team2.client.exception.RecipeExistsException;
import com.team2.client.repository.MealPlanRecipeRepository;
import com.team2.client.repository.MealPlanRepository;
import com.team2.client.repository.RecipeRepository;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.MealPlanService;
import com.team2.client.service.helper.HelperService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MealPlanServiceImpl implements MealPlanService {
    private MealPlanRepository mealPlanRepository;
    private MealPlanRecipeRepository mealPlanRecipeRepository;
    private UserRepository userRepository;

    private HelperService helperService;

    private RecipeRepository recipeRepository;

    private ModelMapper mapper;

    public MealPlanServiceImpl(MealPlanRepository mealPlanRepository, MealPlanRecipeRepository mealPlanRecipeRepository, UserRepository userRepository, HelperService helperService, RecipeRepository repository, ModelMapper mapper) {
        this.mealPlanRepository = mealPlanRepository;
        this.mealPlanRecipeRepository = mealPlanRecipeRepository;
        this.userRepository = userRepository;
        this.helperService = helperService;
        this.recipeRepository = repository;
        this.mapper = mapper;
    }


    @Override
    @Transactional
    public MealPlanDto addRecipeToDay(String username, DayOfWeek dayOfWeek, Long recipeId) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        MealPlan mealPlan = user.getMealPlan();
        if (mealPlan == null) {
            throw new BadCredentialsException("No meal plan found for the user!");
        }

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RecipeExistsException("Recipe not found!"));


        if (this.mealPlanRecipeRepository.findByRecipeAndDayOfWeekAndMealPlan(recipe,dayOfWeek,mealPlan).isPresent()) {
            throw new AlreadyAddedRecipeException("Recipe already added to the following day");
        }

        MealPlanRecipe mealPlanRecipe = new MealPlanRecipe();
        mealPlanRecipe.setMealPlan(mealPlan);
        mealPlanRecipe.setRecipe(recipe);
        mealPlanRecipe.setDate(LocalDate.now());
        mealPlanRecipe.setDayOfWeek(dayOfWeek);



        mealPlan.getMealPlanRecipes().add(this.mealPlanRecipeRepository.saveAndFlush(mealPlanRecipe));
        MealPlan updated = this.mealPlanRepository.saveAndFlush(mealPlan);

        return helperService.getMealPlanDto(updated );
    }

    @Override
    public MealPlanDto removeRecipe(String username, DayOfWeek dayOfWeek, Long recipeId) {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        MealPlan mealPlan = user.getMealPlan();
        if (mealPlan == null) {
            throw new BadCredentialsException("No meal plan found for the user!");
        }

        Recipe recipe = recipeRepository.findById(recipeId)
                .orElseThrow(() -> new RecipeExistsException("Recipe not found!"));


        Optional<MealPlanRecipe> byRecipeAndDayOfWeek = this.mealPlanRecipeRepository.findByRecipeAndDayOfWeekAndMealPlan(recipe, dayOfWeek,mealPlan);

        if (byRecipeAndDayOfWeek.isEmpty()) {
            throw new NotExistingRecipeInTheFollowingDay(String.format("Recipe with id %d is not added to  the following day of week : %s",recipeId,dayOfWeek.toString()));
        }


        mealPlan.getMealPlanRecipes().remove(byRecipeAndDayOfWeek.get());
        this.mealPlanRecipeRepository.delete(byRecipeAndDayOfWeek.get());

        return helperService.getMealPlanDto(this.mealPlanRepository.saveAndFlush(mealPlan));
    }

    @Override
    public MealPlanDto getWeeklyPlan(String username) {

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("User not found"));

        MealPlan mealPlan = user.getMealPlan();
        if (mealPlan == null) {
            MealPlan createdMealPlan = new MealPlan();
            createdMealPlan.setMealPlanRecipes(new ArrayList<>());


            // Save meal plan and recipes
            this.mealPlanRepository.saveAndFlush(createdMealPlan);
            user.setMealPlan(createdMealPlan);
            this.userRepository.saveAndFlush(user);

            MealPlanDto mealPlanDto = new MealPlanDto();
            mealPlanDto.setMealPlanRecipeDtos(new ArrayList<>());


            return mealPlanDto;
        }

        MealPlanDto mealPlanDto= new MealPlanDto();
        List<MealPlanRecipeDto> mappedList = mealPlan.getMealPlanRecipes()
                .stream()
                .map(mealPlanRecipe -> {
                    MealPlanRecipeDto map = this.mapper.map(mealPlanRecipe, MealPlanRecipeDto.class);
                    map.setRecipe(this.mapper.map(mealPlanRecipe.getRecipe(), RecipeDto.class));
                    return map;
                })
                .collect(Collectors.toList());

        mealPlanDto.setMealPlanRecipeDtos(mappedList);

        return  mealPlanDto;
    }

}
