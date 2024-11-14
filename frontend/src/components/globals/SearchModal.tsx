'use client';

import { useState } from 'react';

export default function SearchModal({ isOpen, onClose }) {
  const [searchType, setSearchType] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [recipe, setRecipe] = useState('');
  const [dietary, setDietary] = useState('');
  const [dishType, setDishType] = useState('');
  const [mealType, setMealType] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const searchData = {
      searchType,
      ingredient,
      recipe,
      dietary,
      dishType,
      mealType
    };

    // You can use this data to call an API or filter results
    console.log('Search Data:', searchData);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'} bg-gray-900 bg-opacity-75`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative" style={{ backgroundColor: '#343144' }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-[#741B6A] hover:text-[#4D0545]">
          ✕
        </button>
        <h5 className="text-lg font-semibold mb-4 text-[#8D1B83]">Search Recipes</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-[#8D1B83]">Search By:</label>
            <select
              name="searchType"
              onChange={(e) => setSearchType(e.target.value)}
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD1EA2] text-[#4D0545]"
            >
              <option value="">Select Search Type</option>
              <option value="ingredient">Ingredient</option>
              <option value="recipeName">Recipe Name</option>
              <option value="dietaryType">Dietary Preference</option>
              <option value="dishType">Dish Type</option>
              <option value="mealType">Meal Type</option>
            </select>
          </div>

          {/* Conditional fields for each search type */}
          {searchType === 'ingredient' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-[#8D1B83]">Ingredient Name:</label>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                placeholder="e.g., Tomato, Chicken"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD1EA2] text-[#4D0545]"
                required
              />
            </div>
          )}

          {searchType === 'recipe' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-[#8D1B83]">Recipe Name:</label>
              <input
                type="text"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
                placeholder="e.g., Spaghetti Carbonara"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD1EA2] text-[#4D0545]"
                required
              />
            </div>
          )}

          {searchType === 'dietary' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-[#8D1B83]">Dietary Preference:</label>
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value)}
                name="dietary"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD1EA2] text-[#4D0545]"
                required
              >
                <option value="">Select Preference</option>
                <option value="VEGETARIAN">Vegetarian</option>
                <option value="NON_VEGETARIAN">Non-Vegetarian</option>
                <option value="VEGAN">Vegan</option>
                <option value="GLUTEN_FREE">Gluten-Free</option>
              </select>
            </div>
          )}

          {searchType === 'dish' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-[#8D1B83]">Dish Type:</label>
              <select
                value={dishType}
                onChange={(e) => setDishType(e.target.value)}
                name="dishType"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD1EA2] text-[#4D0545]"
                required
              >
                <option value="">Select Dish Type</option>
                <option value="APPETIZER">Appetizer</option>
                <option value="MAIN_COURSE">Main Course</option>
                <option value="SIDE_DISH">Side Dish</option>
                <option value="DESSERT">Dessert</option>
                <option value="SNACK">Snack</option>
                <option value="BEVERAGE">Beverage</option>
                <option value="STREET_FOOD">Street Food</option>
              </select>
            </div>
          )}

          {searchType === 'meal' && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-[#8D1B83]">Meal Type:</label>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                name="mealType"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#AD1EA2] text-[#4D0545]"
                required
              >
                <option value="">Select Meal Type</option>
                <option value="BREAKFAST">Breakfast</option>
                <option value="LUNCH">Lunch</option>
                <option value="DINNER">Dinner</option>
                <option value="SNACK">Snack</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-[#8D1B83] rounded-lg hover:bg-[#4D0545]"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
