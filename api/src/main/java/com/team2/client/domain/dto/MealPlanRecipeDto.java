package com.team2.client.domain.dto;

import com.team2.client.domain.Recipe;
import jakarta.persistence.Column;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Getter
@Setter
public class MealPlanRecipeDto {


    private DayOfWeek dayOfWeek;

    private RecipeDto recipe;


    private LocalDate date;

}
