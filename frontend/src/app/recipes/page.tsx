'use client';
import React, { useEffect, useState } from 'react';
import ProtectedPage from '@components/globals/ProtectedPage';
import apiClient from '@lib/apiClient';
import RecipeCard from './recipeCard';
import './page.css'
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import CreateRecipe from './createRecipe';
import { FaSearch } from 'react-icons/fa';
import User from '@entities/User';
import { Recipe } from '@entities/Recipe';
import { MealType } from '@types/MealType';
import { DishType } from '@types/DishType';
import { DietaryPreference } from '@types/DietaryPreference';
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserRecipesOnly, setIsUserRecipesOnly] = useState(false);

  const [isPendingRecipesOnly, setIsPendingRecipesOnly] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  // Filters
  const [mealTypeFilter, setMealTypeFilter] = useState<MealType | 'ALL'>('ALL');
  const [dishTypeFilter, setDishTypeFilter] = useState<DishType | 'ALL'>('ALL');
  const [dietaryPreferenceFilter, setDietaryPreferenceFilter] = useState<DietaryPreference | 'ALL'>('ALL');

  const username = User.getInstance().getUser()?.username;
  const loggedId = User.getInstance().getUser()?.id;




  const parameters = useSearchParams();

  // Update search term when the query parameter is present
  useEffect(() => {
    const searchQuery = parameters.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery); // Set the search term if present in the query
    }
  }, [parameters]); // Re-run the effect whenever parameters change



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
      const endpoint = isPendingRecipesOnly
        ? 'my-pending-recipes' // API endpoint for pending recipes
        : isUserRecipesOnly
          ? 'my-recipes' // API endpoint for user-specific recipes
          : 'recipes'; // Default endpoint for all recipes
      const response = await apiClient.get<Recipe[]>(endpoint);
      setRecipes(response);
      console.log(response)
      setFilteredRecipes(response); // Sync the filteredRecipes with fetched data
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [isUserRecipesOnly,isPendingRecipesOnly]);

  const handleOpenCreateRecipe = () => {
    setIsModalOpen(true);
  };

  const hangleFavUpdate = () => {

  }

  const handleCloseCreateRecipe = () => {
    setIsModalOpen(false);
  };

  const handleRecipeUpdate = async () => {
    await fetchRecipes();
  };

  const handleToggleUsersPendingRecipes = () => {
    setIsPendingRecipesOnly(!isPendingRecipesOnly);
    setIsUserRecipesOnly(false); // Reset "My Recipes" when toggling pending recipes
  };

  const handleToggleUserRecipes = () => {
    setIsUserRecipesOnly(!isUserRecipesOnly);
    setIsPendingRecipesOnly(false); // Reset "Pending Recipes" when toggling user recipes
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
      <div className="bg-image-container">

        <div className="container mx-auto px-4 py-6 flex-1">
          <h2 className="text-3xl font-extrabold text-center text-gray-200 mb-8">All Recipes</h2>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
          />


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
              <label htmlFor="mealType" className="block text-sm font-semibold text-gray-200">Meal Type</label>
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
              <label htmlFor="dishType" className="block text-sm font-semibold text-gray-200">Dish Type</label>
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
              <label htmlFor="dietaryPreference" className="block text-sm font-semibold text-gray-200">Dietary
                Preference</label>
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
          <div className="flex justify-center mb-6 space-x-4">
            {/* Button for Pending Recipes */}
            {!isPendingRecipesOnly && (
              <Button
                onClick={handleToggleUsersPendingRecipes}
                className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
              >
                {isPendingRecipesOnly ? 'Show All Recipes' : 'Show Pending Recipes'}
              </Button>
            )}

            {/* Show My Recipes or Show All Recipes Buttons */}
            {!(isPendingRecipesOnly && isUserRecipesOnly) && (
              <>
                <Button
                  onClick={handleToggleUserRecipes}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
                >
                  {isUserRecipesOnly ? 'Show All Recipes' : 'Show My Recipes'}
                </Button>

                {isPendingRecipesOnly && !isUserRecipesOnly && (
                  <Button
                    onClick={handleToggleUsersPendingRecipes}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 transform"
                  >
                    {isPendingRecipesOnly ? 'Show All Recipes' : 'Show Pending Recipes'}
                  </Button>
                )}
              </>
            )}
          </div>


          {/* Display filtered recipes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} loggedInUsername={username} onUpdateRecipe={handleRecipeUpdate}  loggedId={loggedId}/>
            ))}
          </div>
        </div>

        {/* Add recipe button */}
        <div className="fixed bottom-5 right-5">
          <Button
            onClick={handleOpenCreateRecipe}
            className="bg-blue-500 text-white font-semibold text-2xl rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            + Add Recipe
          </Button>
        </div>


        {/* Create Recipe Modal */}
        <CreateRecipe onClose={handleCloseCreateRecipe} isOpen={isModalOpen} onRecipeAdded={handleRecipeUpdate} />
      </div>
    </ProtectedPage>
  );
};


export default Recipes;
