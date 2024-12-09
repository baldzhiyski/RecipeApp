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
  Checkbox, SelectItem,
} from '@nextui-org/react';
import { useState } from 'react';
import apiClient from '@lib/apiClient';
import { DishType } from '@types/DishType';
import { DietaryPreference } from '@types/DietaryPreference';
import { MealType } from '@types/MealType';

interface CreateRecipeProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeAdded: () => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ isOpen, onClose, onRecipeAdded }) => {
  const [recipeName, setRecipeName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [mealType, setMealType] = useState<string | null>(null);
  const [dishType, setDishType] = useState<string | null>(null);
  const [dietaryPreference, setDietaryPreference] = useState<string | null>(null);
  const [instructions, setInstructions] = useState<string>('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [estimatedTime, setEstimatedTime] = useState<number>(0);

  const addIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { ingredientName: '', amount: 0, unit: '' },
    ]);
  };

  const updateIngredient = (index: number, field: keyof typeof ingredients[0], value: string | number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients((prevIngredients) => prevIngredients.filter((_, i) => i !== index));
  };

  const isFormValid = () => {
    return (
      recipeName !== '' &&
      description !== '' &&
      mealType !== null &&
      dietaryPreference !== null &&
      instructions !== '' &&
      ingredients.length > 0 &&
      ingredients.every(
        (ingredient) => ingredient.ingredientName !== '' && ingredient.amount > 0 && ingredient.unit !== ''
      ) &&
      estimatedTime > 0
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
      isPrivate,
      estimatedTime,
    };

    try {
      await apiClient.post('recipes/add', requestBody);
      onRecipeAdded();
    } catch (error) {
      console.error('Failed to upload recipe:', error);
    }

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
            onValueChange={setRecipeName}
            isInvalid={recipeName === ''}
          />
          <Select
            label="Dish Type"
            placeholder="Select Dish type"
            value={dishType || ''}
            onChange={(e) => setDishType(e.target.value as unknown as DishType)}
            isInvalid={!dishType}
          >
            {Object.values(DishType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
            {/* Add your dish types here */}
          </Select>
          <Select
            label="Meal Type"
            placeholder="Select meal type"
            value={mealType || ''}
            onChange={(e) => setMealType(e.target.value as unknown as MealType)}
            isInvalid={!mealType}
          >
            {Object.values(MealType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
            {/* Add your meal types here */}
          </Select>
          <Select
            label="Dietary Preference"
            placeholder="Select dietary preference"
            value={dietaryPreference || ''}
            onChange={(e) => setDietaryPreference(e.target.value as unknown as DietaryPreference)}
            isInvalid={!dietaryPreference}
          >
            {Object.values(DietaryPreference).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
            {/* Add your dietary preferences here */}
          </Select>
          <Textarea
            label="Description"
            placeholder="Recipe Description"
            value={description}
            onValueChange={setDescription}
            isInvalid={description === ''}
          />
          <Textarea
            label="Instructions"
            placeholder="How to make this recipe"
            value={instructions}
            onValueChange={setInstructions}
            isInvalid={instructions === ''}
          />
          {/* Estimated time input */}
          <Input
            label="Estimated Time (minutes)"
            type="number"
            value={estimatedTime}
            onValueChange={(value) => setEstimatedTime(value)}
            min={1}
            isInvalid={estimatedTime <= 0}
          />
          {/* Ingredients section */}
          <div className="mt-4">
            <h3>Ingredients</h3>
            {ingredients.length === 0 && (
              <div style={{ color: 'red', fontSize: '14px' }}>
                At least one ingredient is required.
              </div>
            )}
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center gap-4 mt-2">
                <Input
                  label="Name"
                  placeholder="Ingredient Name"
                  value={ingredient.ingredientName}
                  onValueChange={(value) => updateIngredient(index, 'ingredientName', value)}
                  isInvalid={ingredient.ingredientName === ''}
                />
                <Input
                  label="Amount"
                  type="number"
                  value={ingredient.amount.toString()}
                  onValueChange={(value) => updateIngredient(index, 'amount', parseFloat(value))}
                  isInvalid={ingredient.amount <= 0}
                />
                <Input
                  label="Unit"
                  value={ingredient.unit}
                  onValueChange={(value) => updateIngredient(index, 'unit', value)}
                  isInvalid={ingredient.unit === ''}
                />
                <Button onClick={() => removeIngredient(index)}>Remove</Button>
              </div>
            ))}
            <Button onClick={addIngredient}>+ Add Ingredient</Button>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={upLoadRecipe} disabled={uploading || !isFormValid()}>
            {uploading ? 'Uploading...' : 'Upload Recipe'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateRecipe;
