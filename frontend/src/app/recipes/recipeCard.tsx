'use client';
import { Recipe } from '@entities/Recipe';
import { Button, Card, CardBody } from '@nextui-org/react';
import { FaTrashAlt, FaEye, FaEyeSlash, FaStar } from 'react-icons/fa'; // Import Font Awesome icons
import { useState } from 'react';
import RecipeDetails from './detailedRecipe';
import apiClient from '@lib/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css'

interface RecipeCardProps {
  recipe: Recipe;
  loggedInUsername: string; // The logged-in username
  onUpdateRecipe: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, loggedInUsername, onUpdateRecipe }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(recipe.averageRating);

  const handleRatingUpdate = (newRating: number) => {
    setUpdatedRating(newRating); // Immediately update the rating in the state
    onUpdateRecipe(); // Optionally call this to update the recipe list or perform any other updates
  };

  const handleOpenRecipeDetails = () => {
    setIsModalOpen(true);
  };

  const handleCloseRecipeDetails = () => {
    setIsModalOpen(false);
  };

  const handleDeleteRecipe = async () => {
    try {
      await apiClient.delete(`recipes/${recipe.id}`, {});
      onUpdateRecipe();
    } catch (e) {
      console.log(e);
    }
    console.log(`Deleting recipe with ID: ${recipe.id}`);
  };

  const handleToggleVisibility = async () => {
    await apiClient.put(`recipes/${recipe.id}/toggle-privacy`, {}, {});
    onUpdateRecipe();
    // Logic to toggle visibility of the recipe (send API request or similar)
    console.log(`Toggling visibility for recipe with ID: ${recipe.id}`);
  };

  return (
    <>
      <Card
        className="w-full max-w-md mx-auto p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg transition-transform transform hover:scale-105"
        style={{ backgroundImage: `url(${recipe.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <CardBody className="space-y-4 bg-black bg-opacity-50 p-4 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white">{recipe.recipeName}</h3>
          </div>
          <p className="text-gray-200">{recipe.description}</p>

          <div className="flex flex-col space-y-2 text-sm">
            <div>
              <span className="font-semibold text-gray-200">Meal Type:  {recipe.mealType}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-200">Dish Type: {recipe.dishType}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-200">Created by: {recipe.creatorUsername}</span>
            </div>
            {/* Average Rating */}
            <div className="flex items-center justify-center space-x-1 text-yellow-500">
              <FaStar className="text-lg" />
              <span className="text-lg font-semibold">
                {updatedRating.toFixed(1) || 'No Ratings'}
              </span>
            </div>
          </div>

          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition"
            onClick={handleOpenRecipeDetails}
          >
            View Recipe
          </Button>

          {/* Conditionally render these buttons if the logged-in user is the creator */}
          {loggedInUsername === recipe.creatorUsername && (
            <div className="flex space-x-4 mt-4">
              {/* Delete Recipe Button */}
              <Button
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                onClick={handleDeleteRecipe}
              >
                <FaTrashAlt className="text-lg" />
              </Button>

              {/* Toggle Visibility Button */}
              <Button
                className="bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
                onClick={handleToggleVisibility}
              >
                {recipe.private ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
              </Button>
            </div>
          )}
        </CardBody>
      </Card>

      {/* Recipe Details Modal */}
      <RecipeDetails
        isOpen={isModalOpen}
        onClose={handleCloseRecipeDetails}
        recipe={recipe}
        onRatingUpdate={handleRatingUpdate}
      />
    </>
  );
};

export default RecipeCard;
