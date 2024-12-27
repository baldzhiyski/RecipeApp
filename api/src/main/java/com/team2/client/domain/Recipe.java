package com.team2.client.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team2.client.domain.dto.AddRecipeDTO;
import com.team2.client.domain.enums.DietaryPreference;
import com.team2.client.domain.enums.MealType;
import com.team2.client.domain.enums.RecipeType;
import com.team2.client.utils.Constants;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "recipes")
@Entity
@Getter
@Setter
public class Recipe  extends BaseEntity{


    @Enumerated(EnumType.STRING)
    private RecipeType dishType;

    @Enumerated(EnumType.STRING)
    private MealType mealType; // Add meal type field

    @Enumerated(EnumType.STRING)
    private DietaryPreference dietaryPreference;

    @Column

    @NotBlank
    private String recipeName;

    @Column
    @NotBlank
    private String description;

   @Column(columnDefinition = "TEXT")
   @Lob
   @NotBlank
   private String instructions;


    @OneToMany(mappedBy = "recipe",fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<RecipeIngredient> recipeIngredients;

    @Column
    private Boolean isPrivate;

    @Column
    private Integer estimatedTime;

    @ManyToOne
    private User creator;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Rating> ratings;

    public double getAverageRating() {
        if (ratings == null || ratings.isEmpty()) {
            return 0.0;
        }
        return ratings.stream().mapToLong(Rating::getStars).average().orElse(0.0);
    }



}
