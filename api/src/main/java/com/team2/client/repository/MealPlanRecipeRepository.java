package com.team2.client.repository;

import com.team2.client.domain.MealPlanRecipe;
import com.team2.client.domain.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.Optional;

@Repository
public interface MealPlanRecipeRepository extends JpaRepository<MealPlanRecipe,Long> {


    Optional<MealPlanRecipe> findByRecipeAndDayOfWeek(Recipe recipe, DayOfWeek dayOfWeek);
}
