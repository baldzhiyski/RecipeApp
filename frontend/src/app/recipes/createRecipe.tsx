'use client';

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
  Checkbox,  // Import Checkbox component
} from '@nextui-org/react';
import { DietaryPreference } from '@/types/DietaryPreference';
import { MealType } from '@/types/MealType';
import { useState } from 'react';
import { Ingredient } from '@entities/Ingredient';
import { Recipe } from '@entities/Recipe';
import apiClient from '@lib/apiClient';
import { DishType } from '@/types/DishType';

interface CreateRecipeProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ isOpen, onClose }) => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mealType, setMealType] = useState<MealType | null>(null);
  const [dishType, setDishType] = useState<DishType | null>(null);
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference | null>(null);
  const [instructions, setInstructions] = useState<string>('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);  // New state for privacy

  const addIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      new Ingredient(0, '', ''),
    ]);
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number
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

  const isFormValid = () => {
    return (
      recipeName !== '' &&
      description !== '' &&
      mealType !== null &&
      dietaryPreference !== null &&
      instructions !== '' &&
      ingredients.every(
        (ingredient) =>
          ingredient.ingredientName !== '' &&
          ingredient.amount > 0 &&
          ingredient.unit !== null
      )
    );
  };

  const upLoadRecipe = async () => {
    if (!isFormValid()) return;
    setUploading(true);

    const ingredientsList = ingredients.map((ingredient) => ({
      name: ingredient.ingredientName,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }));

    const requestBody = {
      ingredientsList,
      dishType,
      mealType,
      dietaryPreference,
      recipeName,
      description,
      instructions,
      isPrivate,  // Include isPrivate in the request body
    };

    try {
      await apiClient.post<Recipe>('recipes/add', requestBody);
      console.log(requestBody)
    } catch (error) {
      console.error('Failed to upload recipe:', error);
    }

    // Once done:
    setUploading(false);
    onClose();
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
            label="Dish Type"
            placeholder="Select Dish type"
            value={dishType || ''}
            onChange={(event) =>
              setDishType(event.target.value as unknown as DishType)
            }
          >
            {Object.values(DishType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
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
          <Textarea
            label="Instructions"
            placeholder="How to make this recipe"
            value={instructions}
            onValueChange={setInstructions}
            isInvalid={instructions === ''}
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
                  min="0"
                  value={ingredient.amount.toString()}
                  onValueChange={(value) =>
                    updateIngredient(index, 'amount', parseFloat(value))
                  }
                />
                <Input
                  label="Unit"
                  placeholder="Your unit"
                  value={ingredient.unit}
                  onValueChange={(value) =>
                    updateIngredient(index, 'unit', value)
                  }
                />
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

          {/* Checkbox for privacy */}
          <Checkbox label="Make this recipe private"
                    isSelected={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}> Do you want to stay private ? </Checkbox>


        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-success"
            onClick={upLoadRecipe}
            disabled={!isFormValid()}
          >
            {uploading ? 'Uploading...' : 'Save'}
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
