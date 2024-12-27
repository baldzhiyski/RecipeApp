package com.team2.client.repository;

import com.team2.client.domain.Rating;
import com.team2.client.domain.Recipe;
import com.team2.client.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    Optional<Rating> findByUserAndRecipe(User user, Recipe recipe);
}
