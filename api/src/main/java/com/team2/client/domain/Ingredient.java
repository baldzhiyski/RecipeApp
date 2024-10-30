package com.team2.client.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

    @Entity
    @Table(name = "ingredients")
    @Getter
    @Setter
    public class Ingredient  extends BaseEntity{
        @Column
        @NotBlank
        private String name;
    }


