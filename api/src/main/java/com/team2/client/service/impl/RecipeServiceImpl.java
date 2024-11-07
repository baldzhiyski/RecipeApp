package com.team2.client.service.impl;

import com.team2.client.domain.Recipe;
import com.team2.client.domain.dto.RecipeDto;
import com.team2.client.repository.RecipeRepository;
import com.team2.client.service.RecipeService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {
    private RecipeRepository repository;

    private ModelMapper mapper;

    public RecipeServiceImpl(RecipeRepository repository, ModelMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public List<RecipeDto> getAllRecipies() {
        return repository.findAll()
                .stream()
                .map(recipe -> mapper.map(recipe, RecipeDto.class))
                .collect(Collectors.toList());
    }
}
