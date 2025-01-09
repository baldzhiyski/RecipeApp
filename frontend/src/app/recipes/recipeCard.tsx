'use client';
import { Recipe } from '@entities/Recipe';
import { Button, Card, CardBody } from '@nextui-org/react';
import { FaTrashAlt, FaEye, FaEyeSlash, FaStar, FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa'; // Import Font Awesome icons
import { useState, useEffect } from 'react';
import RecipeDetails from './detailedRecipe';
import apiClient from '@lib/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import UserModal from '@/app/recipes/UserModal';

interface RecipeCardProps {
  recipe: Recipe;
  loggedInUsername: string; // The logged-in username
  loggedId: number;
  onUpdateRecipe: () => void;
  onFavoriteUpdate: () => void; // New prop to update favorites
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, loggedInUsername, onUpdateRecipe, loggedId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedRating, setUpdatedRating] = useState(recipe.averageRating);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Conditionally render buttons for pending recipes
  const isPending = recipe.isPending;

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

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true);
  };

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleSendRecipe = async (userId: string, recipe: Recipe) => {
    try {
     await apiClient.post(`recipes/${recipe.id}/send/${userId}`, {});
      toast.success(`Recipe  sent successfully!`);
    } catch (error) {
      toast.warn(error.message);
    }
    setIsUserModalOpen(false);
  };

  const handleDeleteRecipe = async () => {
    try {
      await apiClient.delete(`recipes/${recipe.id}`, {});
      toast.success(`Recipe successfully deleted from the list!`);
      onUpdateRecipe();
    } catch (e) {
      console.log(e);
    }
    console.log(`Deleting recipe with ID: ${recipe.id}`);
  };

  const handleToggleVisibility = async () => {
    await apiClient.put(`recipes/${recipe.id}/toggle-privacy`, {}, {});
    onUpdateRecipe();
    console.log(`Toggling visibility for recipe with ID: ${recipe.id}`);
  };

  // Handle favorite toggle
  const handleToggleFavorite = async () => {
    try {
      await apiClient.post(`recipes/favourites/${recipe.id}`, {});
      toast.success(`Recipe ${recipe.recipeName} added to favorites!`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeclineRecipe = async () => {
    try {
      await apiClient.delete(`recipes/${recipe.id}/decline/${loggedId}`, {});
      toast.success(`Recipe "${recipe.recipeName}" has been deleted from pending recipes.`);
      onUpdateRecipe(); // Refresh the recipe list
    } catch (e) {
      toast.error(`Error declining recipe: ${e.message}`);
    }
  };

  return (
    <Card
      className="w-full max-w-md mx-auto p-4 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-lg transition-transform transform hover:scale-105"
      style={{
        backgroundImage: `url(${recipe.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <CardBody className="space-y-4 bg-black bg-opacity-50 p-4 rounded-lg">
        <div className="text-center">
          <h3 className="text-xl font-bold text-white">{recipe.recipeName}</h3>
        </div>

          <>
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
              {!recipe.isPending && (
                <div className="flex items-center justify-center space-x-1 text-yellow-500">
                  <FaStar className="text-lg" />
                  <span className="text-lg font-semibold">
                  {updatedRating.toFixed(1) || 'No Ratings'}
                </span>
                </div>
              )}
            </div>

            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow-md hover:shadow-lg transition"
              onClick={handleOpenRecipeDetails}
            >
              View Recipe
            </Button>
          </>

        {/* Only show Accept/Decline buttons if the recipe is pending */}
        {recipe.isPending && (
          <div className="flex space-x-4 mt-4 justify-center flex-wrap">

            <Button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              onClick={handleDeclineRecipe}
            >
              <FaTrashAlt/>
            </Button>
          </div>
        )}

        {/* Conditionally render these buttons if the logged-in user is the creator */}
        {loggedInUsername === recipe.creatorUsername && !isPending && (
          <div className="flex space-x-4 mt-4 justify-center flex-wrap">
            {/* Delete Recipe Button */}
            <Button
              className="p-1 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-red-600"
              onClick={handleDeleteRecipe}
            >
              <FaTrashAlt className="text-red-600 text-2xl" />
            </Button>

            {/* Toggle Visibility Button */}
            <Button
              className="p-1 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-600"
              onClick={handleToggleVisibility}
            >
              {recipe.private ? <FaEyeSlash className="text-yellow-600 text-2xl" /> : <FaEye className="text-yellow-600 text-2xl" />}
            </Button>

            {/* Share Recipe Button */}
            <Button
              className="p-1 hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-green-600 mt-1"
              onClick={handleOpenUserModal}
            >
              <FaShareAlt className="text-green-600 text-2xl" />
            </Button>

            {/* Favorite Button */}
            <Button
              className="bg-transparent text-white hover:text-red-600 p-2 rounded-md mt-4"
              onClick={handleToggleFavorite}
            >
              <FaRegHeart className="text-white text-2xl" />
            </Button>
          </div>
        )}

      </CardBody>

      {/* Recipe Details Modal */}
      <RecipeDetails
        isOpen={isModalOpen}
        onClose={handleCloseRecipeDetails}
        recipe={recipe}
        onRatingUpdate={handleRatingUpdate}
      />

      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={handleCloseUserModal}
        onSendRecipe={(userId: string) => handleSendRecipe(userId, recipe)}
      />
    </Card>
  );
};

export default RecipeCard;
