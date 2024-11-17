'use client';
import React, { useEffect, useState } from 'react';
import ProtectedPage from '@components/globals/ProtectedPage';
import apiClient from '@lib/apiClient';
import { Recipe } from '@entities/Recipe';
import RecipeCard from './recipeCard';
import { Button } from '@nextui-org/react';
import CreateRecipe from './createRecipe';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch recipes data on component mount
    const fetchRecipes = async () => {
      try {
        const response = await apiClient.get<Recipe[]>('recipes');
        setRecipes(response);
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-700">Loading recipes...</p>;
  }

  const handleOpenCreateRecipe = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateRecipe = () => {
    setIsModalOpen(false);
  };

  return (
    <ProtectedPage>
      <div className="bg-gradient-to-r from-blue-50 via-pictionBlue-100 to-blue-200 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-6 flex-1">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">All Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8 mb-8">
          <Button
            onClick={handleOpenCreateRecipe}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
          >
            Create Recipe
          </Button>
        </div>
      </div>
      <CreateRecipe isOpen={isModalOpen} onClose={handleCloseCreateRecipe} />
    </ProtectedPage>
  );
};

export default Recipes;
