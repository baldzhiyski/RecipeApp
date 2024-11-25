package com.team2.client.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "shoppingList")
@Entity
@Setter
@Getter
public class ShoppingList extends BaseEntity {

    @ManyToMany(fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Ingredient> ingredients;


}
