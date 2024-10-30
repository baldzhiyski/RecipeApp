package com.team2.client.controller;

import com.team2.client.service.RecipeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeControllerNormal {

    private RecipeService recipeService;

    public HomeControllerNormal(RecipeService recipeService) {
        this.recipeService = recipeService;
    }


    @GetMapping("/home")
    public String homePage(Model model){
        model.addAttribute("recipes",recipeService.getAllRecipies());
        return "index";
    }
}
