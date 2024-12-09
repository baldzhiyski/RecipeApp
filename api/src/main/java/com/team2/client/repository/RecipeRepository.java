package com.team2.client.repository;

import com.team2.client.domain.Recipe;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RecipeRepository extends JpaRepository<Recipe,Long> {
   Optional<Recipe> findByRecipeName(String name);

   @Query("SELECT r.mealType, COUNT(r) FROM Recipe r GROUP BY r.mealType")
   List<Object[]> countRecipesByMealType();

   @Query("SELECT r.dietaryPreference, COUNT(r) FROM Recipe r GROUP BY r.dietaryPreference")
   List<Object[]> countRecipesByDietaryPreference();


   @Query("SELECT r.dishType, COUNT(r) FROM Recipe r GROUP BY r.dishType")
   List<Object[]> countRecipesByType();


}
