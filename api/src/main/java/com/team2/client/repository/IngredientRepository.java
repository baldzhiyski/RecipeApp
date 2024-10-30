package com.team2.client.repository;

import com.team2.client.domain.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends JpaRepository<RecipeIngredient,Long> {
}
