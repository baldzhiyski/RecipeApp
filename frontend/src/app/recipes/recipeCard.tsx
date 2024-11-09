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
      <Card>
        <CardBody>
          <div>{recipe.recipeName}</div>
          <div>{recipe.description}</div>
          <div>Meal Type: {recipe.mealType}</div>
          <div>Recipe created by: {recipe.creatorUsername}</div>
          <Button onClick={handleOpenRecipeDetails}>View Recipe</Button>
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
