import { IngredientUnit } from "@/types/IngredientUnit";

export class Ingredient {
  amount: number;
  unit: IngredientUnit;
  ingredientName: string;

  constructor(amount: number, unit: IngredientUnit, ingredientName: string) {
    this.amount = amount;
    this.unit = unit;
    this.ingredientName = ingredientName;
  }

  // Optional: Method to display ingredient as a formatted string
  toString(): string {
    return `${this.amount} ${this.unit} of ${this.ingredientName}`;
  }
}
