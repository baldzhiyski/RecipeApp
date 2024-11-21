package com.team2.client.service.impl;

import com.team2.client.domain.Ingredient;
import com.team2.client.domain.ShoppingList;
import com.team2.client.domain.User;
import com.team2.client.domain.dto.ShoppingListDto;
import com.team2.client.exception.UserNotFound;
import com.team2.client.repository.IngredientRepository;
import com.team2.client.repository.ShoppingListRepository;
import com.team2.client.repository.UserRepository;
import com.team2.client.service.ShoppingListService;
import com.team2.client.utils.Constants;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

@Service
public class ShoppingListServiceImpl implements ShoppingListService {
    private IngredientRepository ingredientRepository;
    private UserRepository userRepository;
    private ShoppingListRepository shoppingListRepository;

    private ModelMapper mapper;

    public ShoppingListServiceImpl(IngredientRepository ingredientRepository, UserRepository userRepository, ShoppingListRepository shoppingListRepository, ModelMapper mapper) {
        this.ingredientRepository = ingredientRepository;
        this.userRepository = userRepository;
        this.shoppingListRepository = shoppingListRepository;
        this.mapper = mapper;
    }

    @Override
    public ShoppingListDto addIngredientToList(Long ingredientId, String username) {
        // Fetch the ingredient from the repository using the ingredientId
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new BadCredentialsException("Invalid ingredient id"));

        // Fetch the user using the provided username (email in this case)
        User loggedUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFound("Unauthorized!"));

        // Fetch the shopping list for the logged user, or create a new one if not found
        ShoppingList shoppingList = loggedUser.getShoppingList();

        // Add the ingredient to the shopping list
        shoppingList.getIngredients().add(ingredient);

        // Save the shopping list (new or updated)
        shoppingListRepository.saveAndFlush(shoppingList);
        userRepository.saveAndFlush(loggedUser);

        // Convert the updated shopping list to a DTO and return it
        return this.mapper.map(shoppingList,ShoppingListDto.class);
    }

    @Override
    public ShoppingListDto removeIngredientFromList(Long ingredientId, String username) {
        // Fetch the ingredient from the repository using the ingredientId
        Ingredient ingredient = ingredientRepository.findById(ingredientId)
                .orElseThrow(() -> new BadCredentialsException("Invalid ingredient id"));

        // Fetch the user using the provided username (email in this case)
        User loggedUser = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserNotFound("Unauthorized!"));

        // Fetch the shopping list for the logged user
        ShoppingList shoppingList = loggedUser.getShoppingList();

        // Check if the shopping list is null or the ingredient doesn't exist in the list
        if (shoppingList == null || !shoppingList.getIngredients().contains(ingredient)) {
            throw new BadCredentialsException("Ingredient not found in the shopping list.");
        }

        // Remove the ingredient from the shopping list
        shoppingList.getIngredients().remove(ingredient);

        // Save the updated shopping list (or flush if you want to ensure immediate persistence)
        shoppingListRepository.saveAndFlush(shoppingList);

        // Optionally, save the user if required (e.g., if the user entity itself has additional changes)
        userRepository.saveAndFlush(loggedUser);

        // Convert the updated shopping list to a DTO and return it
        return this.mapper.map(shoppingList, ShoppingListDto.class);
    }

}
