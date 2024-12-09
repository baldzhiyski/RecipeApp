// types/Recipe.ts
import { MealType } from '@/types/MealType';
import { Ingredient } from './Ingredient';
import { DietaryPreference } from '@/types/DietaryPreference';
import { DishType } from '@/types/DishType';

export class Recipe {
  recipeName: string;
  description: string;
  private :boolean;
  mealType: MealType;
  dishType: DishType;
  dietaryPreference: DietaryPreference;
  recipeIngredients: Ingredient[];
  instructions: string;
  creatorUsername: string;
  estimatedTime: string;

  constructor(
    recipeName: string,
    description: string,
    mealType: MealType,
    dishType: DishType,
    dietaryPreference: DietaryPreference,
    recipeIngredients: Ingredient[],
    instructions: string,
    isPrivate :boolean,
    creatorUsername: string,
    estimatedTime: string
  ) {
    this.recipeName = recipeName;
    this.description = description;
    this.mealType = mealType;
    this.dishType = dishType;
    this.dietaryPreference = dietaryPreference;
    this.recipeIngredients = recipeIngredients;
    this.instructions = instructions;
    this.private=isPrivate;
    this.creatorUsername = creatorUsername;
    this.estimatedTime=estimatedTime;
  }

  // Optional: Method to display recipe details as a formatted string
  getSummary(): string {
    return `${this.recipeName} - ${this.description}. Meal Type: ${this.mealType}, Dietary Preference: ${this.dietaryPreference} Dish Type: ${this.dishType}. Created by ${this.creatorUsername}`;
  }

  // Optional: Method to display ingredients in a list format
  listIngredients(): string {
    return this.recipeIngredients
      .map((recipeIngredients) => recipeIngredients.toString())
      .join(', ');
  }
}
