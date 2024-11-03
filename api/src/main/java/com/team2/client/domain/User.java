package com.team2.client.domain;

import com.team2.client.domain.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User  extends BaseEntity{

    @Column
    private UUID uuid;

    @Enumerated(EnumType.STRING)
    private Role roleType;

    @OneToOne
    private ShoppingList shoppingList;

    @OneToOne
    private MealPlan mealPlan;


    @OneToMany(mappedBy = "creator")
    private List<Recipe> createdRecipes;
}
