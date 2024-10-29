package com.team2.client.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipeIngredients")
@Getter
@Setter
public class RecipeIngredient extends BaseEntity{

    @OneToOne
    private Ingredient ingredient;

    @Positive
    private double amount;

    @Column
    @NotBlank
    private String unit;

    @ManyToOne
    private Recipe recipe;
}
