// components/RecipeDetails.tsx
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
    <Modal isOpen={isOpen} placement="center" onClose={onClose} isDismissable>
      <ModalContent className="text-black">
        <ModalHeader>
          <h2>{recipe.recipeName}</h2>
        </ModalHeader>
        <ModalBody>
          <p>{recipe.description}</p>
          <p>Meal Type: {recipe.mealType}</p>
          <p>Dish Type: {recipe.dishType}</p>
          <p>Dietary Preference: {recipe.dietaryPreference}</p>
          <p>Created by: {recipe.creatorUsername}</p>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.recipeIngredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.amount} {ingredient.unit} of{' '}
                {ingredient.ingredientName}
              </li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p>{recipe.instructions}</p>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-danger" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RecipeDetails;
