package com.team2.client.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.team2.client.domain.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User  extends BaseEntity implements UserDetails {

    @Column
    @NotEmpty
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;
    @Column
    @NotEmpty
    private String password;

    @Column
    private Date created;

    @Column
    @NotEmpty
    private String email;

    @Column
    private String profileImageUrl;

    @Column
    private UUID uuid;

    @Enumerated(EnumType.STRING)
    private Role roleType;

    @OneToOne
    @JsonBackReference
    private ShoppingList shoppingList;

    @OneToOne
    @JsonManagedReference
    private MealPlan mealPlan;


    @OneToMany(mappedBy = "creator",fetch = FetchType.EAGER)
    @JsonBackReference
    private List<Recipe> createdRecipes;


    @OneToMany
    @JsonBackReference
    private List<Recipe> favouriteRecipes;


    @ManyToMany
    @JsonBackReference
    private List<Recipe> pendingRecipes;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + roleType.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // If you want to not allow the user to login before verifying their email, you can change this to
    // return verified;
    @Override
    public boolean isEnabled() {
        return true;
    }
}
