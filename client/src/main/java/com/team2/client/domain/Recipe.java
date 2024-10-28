package com.team2.client.domain;

import com.team2.client.utils.Constants;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Table(name = "recipes")
@Entity
@Getter
@Setter
public class Recipe  extends BaseEntity{

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
