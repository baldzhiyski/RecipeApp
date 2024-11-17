import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react';
import { Recipe } from '@entities/Recipe';

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
          <div className="space-y-2">
            <h4 className="text-xl font-semibold">Ingredients:</h4>
            <ul className="list-disc list-inside space-y-1">
              {recipe.recipeIngredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} of {ingredient.ingredientName}
                </li>
              ))}
            </ul>
          </div>
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
