// types/Recipe.ts
import { MealType } from '@/types/MealType';
import { Ingredient } from './Ingredient';
import { DietaryPreference } from '@/types/DietaryPreference';

export class Recipe {
  recipeName: string;
  description: string;
  mealType: MealType;
  dietaryPreference: DietaryPreference;
  recipeIngredients: Ingredient[];
  instructions: string;
  creatorUsername: string;

  constructor(
    recipeName: string,
    description: string,
    mealType: MealType,
    dietaryPreference: DietaryPreference,
    recipeIngredients: Ingredient[],
    instructions: string,
    creatorUsername: string
  ) {
    this.recipeName = recipeName;
    this.description = description;
    this.mealType = mealType;
    this.dietaryPreference = dietaryPreference;
    this.recipeIngredients = recipeIngredients;
    this.instructions = instructions;
    this.creatorUsername = creatorUsername;
  }

  // Optional: Method to display recipe details as a formatted string
  getSummary(): string {
    return `${this.recipeName} - ${this.description}. Meal Type: ${this.mealType}, Dietary Preference: ${this.dietaryPreference}`;
  }

  // Optional: Method to display ingredients in a list format
  listIngredients(): string {
    return this.recipeIngredients
      .map((recipeIngredients) => recipeIngredients.toString())
      .join(', ');
  }
}
