package com.team2.client.domain.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingDto {
    @NotNull
    private Long recipeId;

    private Long numStars;
}