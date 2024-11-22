package com.team2.client.domain.dto;

import com.team2.client.domain.Ingredient;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AllIngredientsDto {

    private List<Ingredient> ingredients;

    public AllIngredientsDto(List<Ingredient> ing) {
        this.ingredients=ing;
    }
}
