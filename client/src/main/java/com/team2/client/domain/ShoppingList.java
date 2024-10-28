package com.team2.client.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "shoppingList")
@Entity
@Setter
@Getter
public class ShoppingList extends BaseEntity {

    @OneToMany
    private List<Ingredient> ingredients;

}
