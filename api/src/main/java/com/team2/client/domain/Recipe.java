package com.team2.client.domain;

import com.team2.client.domain.enums.RecipeType;
import com.team2.client.utils.Constants;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "recipes")
@Entity
@Getter
@Setter
public class Recipe  extends BaseEntity{

    @Enumerated(EnumType.STRING)
    private RecipeType dishType;

    @Column
    @NotBlank
    private String recipeName;

    @Column
    @NotBlank
    private String description;

    @Column
    @NotBlank
    private String instructions;


}
