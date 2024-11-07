package com.team2.client.repository;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.RecipeIngredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient,Long> {

    Optional<Ingredient> findByName(String name);

}
