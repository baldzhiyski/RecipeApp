package com.team2.client.domain.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientDto {
    @NotBlank
    @JsonProperty("ingredientName")
    private String name;

    @Positive
    private double amount;

    @NotBlank
    private String unit;
}
