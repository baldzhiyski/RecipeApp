package com.team2.client.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipe_ingredients")
@Getter
@Setter
public class RecipeIngredient extends BaseEntity{

    @ManyToOne
    @JsonBackReference
    private Ingredient ingredient;

    @Positive
    private double amount;

    @Column
    @NotBlank
    private String unit;

    @ManyToOne
    @JsonBackReference
    private Recipe recipe;
}
