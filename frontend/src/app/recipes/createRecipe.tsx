'use client';

// components/RecipeDetails.tsx
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  Textarea,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { DietaryPreference } from '@/types/DietaryPreference';
import { MealType } from '@/types/MealType';
import { useState } from 'react';
import { Ingredient } from '@entities/Ingredient';
import { IngredientUnit } from '@/types/IngredientUnit';

interface CreateRecipeProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ isOpen, onClose }) => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  //const [instructions, setInstructions] = useState<string>('');
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [dietaryPreference, setDietaryPreference] =
    useState<DietaryPreference | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const addIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      new Ingredient(0, IngredientUnit.GRAMS, ''),
    ]);
  };

  // Update the updateIngredient function to expect a number for the 'amount' field
  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | IngredientUnit | number
  ) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  return (
    <Modal isOpen={isOpen} placement="center" onClose={onClose}>
      <ModalContent className="text-black">
        <ModalHeader>
          <h2>New Recipe!</h2>
        </ModalHeader>
        <ModalBody>
          <Input
            label="Recipe Name"
            placeholder="Recipe Name"
            value={recipeName}
            isInvalid={recipeName === ''}
            onValueChange={setRecipeName}
          />
          <Select
            label="Meal Type"
            placeholder="Select meal type"
            value={mealType || ''}
            onChange={(event) =>
              setMealType(event.target.value as unknown as MealType)
            }
          >
            {Object.values(MealType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
          <Select
            label="Dietary Preference"
            placeholder="Select dietary preference"
            value={dietaryPreference || ''}
            onChange={(event) =>
              setDietaryPreference(
                event.target.value as unknown as DietaryPreference
              )
            }
          >
            {Object.values(DietaryPreference).map((preference) => (
              <SelectItem key={preference} value={preference}>
                {preference}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            value={description}
            onValueChange={setDescription}
            placeholder="Description"
            isInvalid={description === ''}
          />
          <div className="mt-4">
            <h3>Ingredients</h3>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <Input
                  label="Name"
                  placeholder="Ingredient name"
                  value={ingredient.ingredientName}
                  onValueChange={(value) =>
                    updateIngredient(index, 'ingredientName', value)
                  }
                />
                <Input
                  label="Amount"
                  placeholder="Amount"
                  type="number"
                  value={ingredient.amount.toString()}
                  onValueChange={(value) =>
                    updateIngredient(index, 'amount', parseFloat(value))
                  }
                />
                <Select
                  label="Unit"
                  placeholder="Select unit"
                  value={ingredient.unit}
                  onChange={(event) =>
                    updateIngredient(
                      index,
                      'unit',
                      event.target.value as IngredientUnit
                    )
                  }
                >
                  {Object.values(IngredientUnit).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </Select>
                <Button
                  className="bg-danger"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button onClick={addIngredient} className="mt-4 bg-primary">
              + Add Ingredient
            </Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-success" onClick={onClose}>
            Save
          </Button>
          <Button className="bg-danger" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRecipe;
