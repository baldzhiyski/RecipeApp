'use client';
import React, { useEffect, useState } from 'react';
import ProtectedPage from '@components/globals/ProtectedPage';
import apiClient from '@lib/apiClient';
import RecipeCard from './recipeCard';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import CreateRecipe from './createRecipe';
import { FaSearch } from 'react-icons/fa';
import User from '@entities/User';
import { Recipe } from '@entities/Recipe';
import { MealType } from '@types/MealType';
import { DishType } from '@types/DishType';
import { DietaryPreference } from '@types/DietaryPreference';

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserRecipesOnly, setIsUserRecipesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Filters
  const [mealTypeFilter, setMealTypeFilter] = useState<MealType | 'ALL'>('ALL');
  const [dishTypeFilter, setDishTypeFilter] = useState<DishType | 'ALL'>('ALL');
  const [dietaryPreferenceFilter, setDietaryPreferenceFilter] = useState<DietaryPreference | 'ALL'>('ALL');

  const username = User.getInstance().getUser()?.username;

  useEffect(() => {
    let filtered = recipes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((recipe) =>
        recipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by meal type
    if (mealTypeFilter !== 'ALL') {
      filtered = filtered.filter((recipe) => recipe.mealType === mealTypeFilter);
    }

    // Filter by dish type
    if (dishTypeFilter !== 'ALL') {
      filtered = filtered.filter((recipe) => recipe.dishType === dishTypeFilter);
    }

    // Filter by dietary preference
    if (dietaryPreferenceFilter !== 'ALL') {
      filtered = filtered.filter((recipe) => recipe.dietaryPreference === dietaryPreferenceFilter);
    }

    setFilteredRecipes(filtered);
  }, [searchTerm, recipes, mealTypeFilter, dishTypeFilter, dietaryPreferenceFilter]);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const endpoint = isUserRecipesOnly ? 'my-recipes' : 'recipes';
      const response = await apiClient.get<Recipe[]>(endpoint);
      setRecipes(response);
      setFilteredRecipes(response); // Sync the filteredRecipes with fetched data
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [isUserRecipesOnly]);

  const handleOpenCreateRecipe = () => {
    setIsModalOpen(true);
  };

  const handleCloseCreateRecipe = () => {
    setIsModalOpen(false);
  };

  const handleRecipeUpdate = async () => {
    await fetchRecipes();
  };

  const handleToggleUserRecipes = () => {
    setIsUserRecipesOnly(!isUserRecipesOnly);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handlers for the filters
  const handleMealTypeChange = (value: MealType | 'ALL') => {
    setMealTypeFilter(value);
  };

  const handleDishTypeChange = (value: DishType | 'ALL') => {
    setDishTypeFilter(value);
  };

  const handleDietaryPreferenceChange = (value: DietaryPreference | 'ALL') => {
    setDietaryPreferenceFilter(value);
  };

  const handleClearFilters = () => {
    setMealTypeFilter('ALL');
    setDishTypeFilter('ALL');
    setDietaryPreferenceFilter('ALL');
    setSearchTerm('');
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-700">Loading recipes...</p>;
  }

  return (
    <ProtectedPage>
      <div className="bg-gradient-to-r from-blue-50 via-pictionBlue-100 to-blue-200 min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-6 flex-1">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">All Recipes</h2>

          {/* Search Filter */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <Input
                aria-label="Search by recipe name"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pr-10"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Filters */}
          <div className="flex justify-center mb-6 space-x-4">
            {/* Meal Type Filter */}
            <div className="relative w-60">
              <label htmlFor="mealType" className="block text-sm font-semibold text-gray-600">Meal Type</label>
              <Select
                value={mealTypeFilter}
                onChange={(e) => handleMealTypeChange(e.target.value as MealType | 'ALL')}
                aria-label="Meal Type"
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <SelectItem value={'ALL'} key={'ALL'}></SelectItem>
                {Object.values(MealType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Dish Type Filter */}
            <div className="relative w-60">
              <label htmlFor="dishType" className="block text-sm font-semibold text-gray-600">Dish Type</label>
              <Select
                value={dishTypeFilter}
                onChange={(e) => handleDishTypeChange(e.target.value as DishType | 'ALL')}
                aria-label="Dish Type"
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <SelectItem value={'ALL'} key={'ALL'}></SelectItem>
                {Object.values(DishType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Dietary Preference Filter */}
            <div className="relative w-60">
              <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-gray-600">Dietary Preference</label>
              <Select
                value={dietaryPreferenceFilter}
                onChange={(e) => handleDietaryPreferenceChange(e.target.value as DietaryPreference | 'ALL')}
                aria-label="Dietary Preference"
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <SelectItem value={'ALL'} key={'ALL'}></SelectItem>
                {Object.values(DietaryPreference).map((preference) => (
                  <SelectItem key={preference} value={preference}>
                    {preference}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Clear Filters Button */}
            <div className="flex items-end">
              <Button
                onClick={handleClearFilters}
                className="bg-red-500 text-white font-semibold text-sm px-4 py-2 rounded-md hover:scale-105 transition-all duration-300"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* User recipes toggle */}
          <div className="flex justify-center mb-6">
            <Button
              onClick={handleToggleUserRecipes}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
            >
              {isUserRecipesOnly ? 'Show All Recipes' : 'Show My Recipes'}
            </Button>
          </div>

          {/* Display filtered recipes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} loggedInUsername={username} onUpdateRecipe={handleRecipeUpdate} />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 mb-8">
          <Button
            onClick={handleOpenCreateRecipe}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
          >
            Create New Recipe
          </Button>
        </div>

        {/* Create Recipe Modal */}
        <CreateRecipe onClose={handleCloseCreateRecipe}  isOpen={isModalOpen} onRecipeAdded={handleRecipeUpdate}/>
      </div>
    </ProtectedPage>
  );
};

export default Recipes;
