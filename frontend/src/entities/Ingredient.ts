export class Ingredient {
  amount: number;
  unit: string;
  ingredientName: string;

  constructor(amount: number, unit: string, ingredientName: string) {
    this.amount = amount;
    this.unit = unit;
    this.ingredientName = ingredientName;
  }

  // Optional: Method to display ingredient as a formatted string
  toString(): string {
    return `${this.amount} ${this.unit} of ${this.ingredientName}`;
  }
}
