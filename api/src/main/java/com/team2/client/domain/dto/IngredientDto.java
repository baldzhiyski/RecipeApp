package com.team2.client.domain.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class IngredientDto {
    @NotBlank
    private String name;

    @Positive
    private double amount;

    @Column
    @NotBlank
    private String unit;
}
