import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import { Recipe } from '@entities/Recipe';
import { useState, useEffect } from 'react';

interface RecipeDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
}

const RecipeDetails: React.FC<RecipeDetailsProps> = ({
                                                       isOpen,
                                                       onClose,
                                                       recipe,
                                                     }) => {
  const [portions, setPortions] = useState(1);  // Default portion size
  const [scaledIngredients, setScaledIngredients] = useState(recipe.recipeIngredients);

  // Function to scale the ingredient quantities
  const scaleIngredients = (ingredients: any[], portions: number) => {
    return ingredients.map(ingredient => ({
      ...ingredient,
      amount: ingredient.amount * portions, // Multiply amount by the number of portions
    }));
  };

  // Update scaled ingredients whenever recipe or portions change
  useEffect(() => {
    if (recipe.recipeIngredients) {
      setScaledIngredients(scaleIngredients(recipe.recipeIngredients, portions));
    }
  }, [recipe, portions]);

  // Handle increment and decrement for portions
  const increasePortions = () => setPortions(prev => prev + 1);
  const decreasePortions = () => setPortions(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={onClose}
      isDismissable
      className="flex items-center justify-center"
    >
      {/* Updated background color */}
      <ModalContent className="bg-blue-100 p-6 rounded-lg shadow-xl max-w-md w-full">
        <ModalHeader className="border-b pb-4 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{recipe.recipeName}</h2>
        </ModalHeader>
        <ModalBody className="space-y-4 text-gray-700">
          <p className="text-lg">{recipe.description}</p>
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Meal Type:</span> {recipe.mealType}
            </p>
            <p>
              <span className="font-semibold">Dish Type:</span> {recipe.dishType}
            </p>
            <p>
              <span className="font-semibold">Dietary Preference:</span> {recipe.dietaryPreference}
            </p>
            <p>
              <span className="font-semibold">Created by:</span> {recipe.creatorUsername}
            </p>
          </div>


          {/* Ingredients List */}
          <div className="space-y-2 mt-4">
            <h4 className="text-xl font-semibold">Ingredients:</h4>
            <ul className="list-disc list-inside space-y-1">
              {scaledIngredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} of {ingredient.ingredientName}
                </li>
              ))}
            </ul>
          </div>

          {/* Portion Control */}
          <div className="mt-4 flex justify-between items-center">
            <h4 className="text-xl font-semibold">Portions: {portions}</h4>
            <div className="flex space-x-4">
              <Button onClick={decreasePortions} disabled={portions <= 1}>
                -
              </Button>
              <Button onClick={increasePortions}>+</Button>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h4 className="text-xl font-semibold">Instructions:</h4>
            <p>{recipe.instructions}</p>
          </div>
        </ModalBody>
        <ModalFooter className="pt-4">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetails;
