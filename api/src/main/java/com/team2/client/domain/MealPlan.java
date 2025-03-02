package com.team2.client.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @OneToMany(fetch = FetchType.EAGER,mappedBy = "mealPlan")
    @JsonBackReference
    private List<MealPlanRecipe> mealPlanRecipes;
}
