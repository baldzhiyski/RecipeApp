package com.team2.client.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Table(name = "mealPlanRecipe")
@Entity
@Getter
@Setter
public class MealPlanRecipe extends BaseEntity {

    @Column
    private DayOfWeek dayOfWeek;
    @OneToOne
    private Recipe recipe;

    @Column
    private LocalDate date;


    @ManyToOne
    private MealPlan mealPlan;
}
