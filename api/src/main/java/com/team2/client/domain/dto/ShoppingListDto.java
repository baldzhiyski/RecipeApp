package com.team2.client.domain.dto;

import com.team2.client.domain.Ingredient;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ShoppingListDto {

    private List<Ingredient> ingredients;

    private String userUsername;
}
