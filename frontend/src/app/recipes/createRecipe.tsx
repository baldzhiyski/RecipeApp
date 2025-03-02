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
import { useState } from 'react';
import apiClient from '@lib/apiClient';
import { DishType } from '@types/DishType';
import { DietaryPreference } from '@types/DietaryPreference';
import { MealType } from '@types/MealType';
import { FaCameraRetro } from 'react-icons/fa'; // Import Font Awesome icon

import { toast, ToastContainer } from 'react-toastify';

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
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoName, setPhotoName] = useState<string>(''); // State to store the name of the uploaded photo

  const addIngredient = () => {
    setIngredients((prevIngredients) => [
      ...prevIngredients,
      { ingredientName: '', amount: 0, unit: '' },
    ]);
  };

  const updateIngredient = (index: number, field: keyof typeof ingredients[0], value: string | number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient,
      ),
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
        (ingredient) => ingredient.ingredientName !== '' && ingredient.amount > 0 && ingredient.unit !== '',
      ) &&
      estimatedTime > 0
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPhoto(file);
      setPhotoName(file.name); // Update the state with the name of the uploaded photo
    } else {
      toast('Image is required !');
    }
  };

  const upLoadRecipe = async () => {
    if (!isFormValid()) return;
    setUploading(true);

    const ingredientsList = ingredients.map((ingredient) => ({
      name: ingredient.ingredientName,
      amount: ingredient.amount,
      unit: ingredient.unit,
    }));

    const ingr = JSON.stringify(ingredientsList);

    const formData = new FormData();
    formData.append('addRecipeDTO', JSON.stringify({
      ingredients,
      dishType: dishType || '',
      mealType: mealType || '',
      dietaryPreference: dietaryPreference || '',
      recipeName,
      description,
      instructions,
      isPrivate: isPrivate,
      estimatedTime: String(estimatedTime),
    }));

    if (photo) {
      formData.append('image', photo);  // Image part
    }
    try {
      // Log each key-value pair of formData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await apiClient.postRecipe('recipes/add', formData, {
        headers: '',
      });
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
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Input
                label="Recipe Name"
                placeholder="Recipe Name"
                value={recipeName}
                onValueChange={setRecipeName}
                isInvalid={recipeName === ''}
              />
            </div>
            <div className="flex flex-col">
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
              </Select>
            </div>
            <div className="flex flex-col">
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
              </Select>
            </div>
            <div className="flex flex-col">
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
              </Select>
            </div>
            <div className="flex flex-col col-span-2">
              <Textarea
                label="Description"
                placeholder="Recipe Description"
                value={description}
                onValueChange={setDescription}
                isInvalid={description === ''}
              />
            </div>
            <div className="flex flex-col col-span-2">
              <Textarea
                label="Instructions"
                placeholder="How to make this recipe"
                value={instructions}
                onValueChange={setInstructions}
                isInvalid={instructions === ''}
              />
            </div>
            <div className="flex flex-col">
              <Input
                label="Estimated Time (minutes)"
                type="number"
                value={estimatedTime}
                onValueChange={(value) => setEstimatedTime(value)}
                min={1}
                isInvalid={estimatedTime <= 0}
              />
            </div>
            {/* Photo Upload section with Font Awesome icon */}
            <div className="flex flex-col items-center">
              <label htmlFor="file-upload" className="cursor-pointer">
                <FaCameraRetro size={40} /> {/* Font Awesome Camera Icon */}
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                required
              />
              {!photo && (
                <p className="mt-2 text-sm text-red-600">Image is required!</p>
                )}
              {photoName && <p className="mt-2 text-sm">{photoName}</p>} {/* Display uploaded file name */}
            </div>
            {/* Ingredients section */}
            <div className="mt-4 col-span-2">
              <h3>Ingredients</h3>
              {ingredients.length === 0 && (
                <div style={{ color: 'red', fontSize: '14px' }}>
                  At least one ingredient is required.
                </div>
              )}
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-4 items-center mt-2">
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
