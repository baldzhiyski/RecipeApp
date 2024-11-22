package com.team2.client.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "shoppingList")
@Entity
@Setter
@Getter
public class ShoppingList extends BaseEntity {

    @OneToMany(fetch = FetchType.EAGER)
    private List<Ingredient> ingredients;


}
