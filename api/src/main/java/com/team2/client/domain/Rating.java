package com.team2.client.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ratings")
@Getter
@Setter
public class Rating extends BaseEntity {
    @ManyToOne
    @JsonBackReference
    private Recipe recipe;

    @ManyToOne
    @JsonBackReference
    private User user;

    @Column(nullable = false)
    private Long stars;
}
