package com.team2.client.restController;

import com.team2.client.domain.dto.MealPlanDto;
import com.team2.client.exception.AlreadyAddedRecipeException;
import com.team2.client.exception.NotExistingRecipeInTheFollowingDay;
import com.team2.client.service.MealPlanService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;


@RestController
@Tag(name = "MealPlan Endpoints", description = "Managing creating meal plan for the current week.")
public class MealPlanController {
    private MealPlanService mealPlanService;

    public MealPlanController(MealPlanService mealPlanService) {
        this.mealPlanService = mealPlanService;
    }


    @GetMapping("/api/weekly-plan")
    public ResponseEntity<MealPlanDto> getWeeklyPlan(@AuthenticationPrincipal UserDetails userDetails) {
        MealPlanDto mealPlan = mealPlanService.getWeeklyPlan(userDetails.getUsername());
        return ResponseEntity.ok(mealPlan);
    }



    @PostMapping("/api/meal-plans/{dayOfWeek}/add-recipe")
    @Operation(summary = "Add a recipe to a specific day of the weekly plan", description = "Adds a recipe to the specified day in the user's meal plan.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Recipe added to the meal plan successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MealPlanDto.class))),
            @ApiResponse(responseCode = "400", description = "Recipe already added to the following day of the week",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AlreadyAddedRecipeException.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized user")
    })
    public ResponseEntity<MealPlanDto> addRecipeToDay(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("dayOfWeek") String dayOfWeek,
            @RequestParam("recipeId") Long recipeId) {

        MealPlanDto updatedPlan = mealPlanService.addRecipeToDay(userDetails.getUsername(), DayOfWeek.valueOf(dayOfWeek.toUpperCase()), recipeId);
        return ResponseEntity.ok(updatedPlan);
    }

    @Operation(summary = "Remove a recipe from a specific day", description = "Removes a recipe from the specified day in the user's meal plan.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Recipe removed from the meal plan successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MealPlanDto.class))),
            @ApiResponse(responseCode = "400", description = "Recipe not added in the given day to be deleted",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = NotExistingRecipeInTheFollowingDay.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized user")
    })
    @PostMapping("/api/meal-plans/{dayOfWeek}/remove-recipe")
    public ResponseEntity<MealPlanDto> removeRecipe(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable("dayOfWeek") String dayOfWeek,
            @RequestParam("recipeId") Long recipeId) {

        MealPlanDto updatedPlan = mealPlanService.removeRecipe(userDetails.getUsername(), DayOfWeek.valueOf(dayOfWeek.toUpperCase()), recipeId);
        return ResponseEntity.ok(updatedPlan);
    }


}
