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
    return <p className="text-center mt-10">Loading recipes...</p>;
  }

  const handleOpenCreateRecipe = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateRecipe = () => {
    setIsModalOpen(false);
  };

  return (
    <ProtectedPage>
      <div className="container mx-auto px-4 py-10">
        <div className="text-2xl font-bold text-center mb-6">All Recipes</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </div>
      <Button onClick={handleOpenCreateRecipe}>Create Recipe</Button>
      <CreateRecipe isOpen={isModalOpen} onClose={handleCloseCreateRecipe} />
    </ProtectedPage>
  );
};

export default Recipes;
