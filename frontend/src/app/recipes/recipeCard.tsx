'use client';
import { Recipe } from '@entities/Recipe';
import { Button, Card, CardBody } from '@nextui-org/react';
import RecipeDetails from './detailedRecipe';
import { useState } from 'react';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenRecipeDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseRecipeDetails = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg transition-transform transform hover:scale-105">
        <CardBody className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-700">{recipe.recipeName}</h3>
          </div>
          <p className="text-gray-600">{recipe.description}</p>
          <div className="flex flex-col space-y-2 text-sm">
            <div>
              <span className="font-semibold text-blue-700">Meal Type:</span> {recipe.mealType}
            </div>
            <div>
              <span className="font-semibold text-blue-700">Dish Type:</span> {recipe.dishType}
            </div>
            <div>
              <span className="font-semibold text-blue-700">Created by:</span> {recipe.creatorUsername}
            </div>
          </div>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition"
            onClick={handleOpenRecipeDetails}
          >
            View Recipe
          </Button>
        </CardBody>
      </Card>
      <RecipeDetails
        isOpen={isModalOpen}
        onClose={handleCloseRecipeDetails}
        recipe={recipe}
      />
    </>
  );
};

export default RecipeCard;
