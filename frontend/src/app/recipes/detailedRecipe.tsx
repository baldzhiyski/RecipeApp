import { Modal, Button, ModalBody, ModalFooter, ModalHeader, ModalContent } from '@nextui-org/react';
import { Recipe } from '@entities/Recipe';
import { useState, useEffect } from 'react';
import { FaClock } from 'react-icons/fa'; // Importing the clock icon

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
  const [portions, setPortions] = useState(1); // Default portion size
  const [scaledIngredients, setScaledIngredients] = useState(recipe.recipeIngredients);

  // Function to scale the ingredient quantities
  const scaleIngredients = (ingredients: any[], portions: number) => {
    return ingredients.map((ingredient) => ({
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
  const increasePortions = () => setPortions((prev) => prev + 1);
  const decreasePortions = () => setPortions((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onClose={onClose}
      isDismissable
      className="flex items-center justify-center"
    >
      <ModalContent className="bg-blue-100 p-4 rounded-lg shadow-xl max-w-xl w-full">
        <ModalHeader className="border-b pb-2 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">{recipe.recipeName}</h2>
        </ModalHeader>

        <ModalBody className="space-y-3 text-gray-700">
          {/* Description and Details */}
          <p className="text-base">{recipe.description}</p>

          <div className="text-sm space-y-1">
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

          {/* Estimated Time with Clock Icon */}
          <div className="flex items-center space-x-2 mt-2">
            <FaClock className="text-gray-500" />
            <span className="text-sm">
              Estimated Time: {recipe.estimatedTime} minutes
            </span>
          </div>

          {/* Ingredients List */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Ingredients:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {scaledIngredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} of {ingredient.ingredientName}
                </li>
              ))}
            </ul>
          </div>

          {/* Portion Control */}
          <div className="mt-4 flex justify-between items-center">
            <h4 className="text-sm font-semibold">Portions: {portions}</h4>
            <div className="flex space-x-2">
              <Button onClick={decreasePortions} disabled={portions <= 1} size="sm">
                -
              </Button>
              <Button onClick={increasePortions} size="sm">+</Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Instructions:</h4>
            <p className="text-sm">{recipe.instructions}</p>
          </div>
        </ModalBody>

        <ModalFooter className="pt-2">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium transition"
            onClick={onClose}
            size="sm"
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetails;
