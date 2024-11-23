package com.team2.client.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "mealPlan")
@Getter
@Setter
public class MealPlan extends BaseEntity{

    @OneToMany(fetch = FetchType.EAGER)
    private List<MealPlanRecipe> mealPlanRecipes;
}
