package com.team2.client.service.impl;

import com.team2.client.domain.Recipe;
import com.team2.client.repository.RecipeRepository;
import com.team2.client.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecipeServiceImpl implements RecipeService {
    private RecipeRepository repository;

    public RecipeServiceImpl(RecipeRepository repository) {
        this.repository = repository;
    }


    @Override
    public List<Recipe> getAllRecipies() {
        return repository.findAll();
    }
}
