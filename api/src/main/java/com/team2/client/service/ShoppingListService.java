package com.team2.client.service;

import com.team2.client.domain.dto.ShoppingListDto;

public interface ShoppingListService {
    ShoppingListDto addIngredientToList(Long ingredientId, String username);



    ShoppingListDto removeIngredientFromList(Long ingredientId, String username);

    ShoppingListDto getShoppingList(String username);
}
