package com.team2.client.service;


import com.team2.client.domain.Recipe;
import com.team2.client.domain.dto.RecipeDto;
import org.springframework.http.HttpStatusCode;

import java.util.List;

public interface RecipeService {
    List<RecipeDto> getAllRecipies();
}
