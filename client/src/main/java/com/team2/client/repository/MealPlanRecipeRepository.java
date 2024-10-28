package com.team2.client.repository;

import com.team2.client.domain.MealPlanRecipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlanRecipeRepository extends JpaRepository<MealPlanRecipe,Long> {
}
