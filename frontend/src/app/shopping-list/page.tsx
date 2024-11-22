"use client";
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import apiClient from '@lib/apiClient';
import { Ingredient } from '@types/IngredientType';

const ShoppingListPage = () => {
  const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Clear any existing error on page reload
    const fetchShoppingList = async () => {
      try {
        const shoppingListData = await apiClient.getShoppingListForLoggedUser();
        setShoppingList(shoppingListData.ingredients);
      } catch (err) {
        toast.error('Failed to fetch shopping list'); // Toast error message
      }
    };

    const fetchAvailableIngredients = async () => {
      try {
        const ingredientsData = await apiClient.getAllAvailableIngredients();
        setAvailableIngredients(ingredientsData.ingredients);
      } catch (err) {
        toast.error('Failed to fetch ingredients'); // Toast error message
      }
    };

    fetchShoppingList();
    fetchAvailableIngredients();
  }, []);

  const handleAddIngredient = async (ingredientId: number) => {
    try {
      setLoading(true);
      await apiClient.addIngredientToShoppingList(ingredientId);
      setShoppingList((await apiClient.getShoppingListForLoggedUser()).ingredients);
      setLoading(false);
      toast.success('Ingredient added to shopping list');
    } catch (err) {
      setLoading(false);
      toast.error(err.message); // Toast error message
    }
  };

  const handleRemoveIngredient = async (ingredientId: number) => {
    try {
      setLoading(true);
      await apiClient.removeIngredientFromList(ingredientId);
      setShoppingList((await apiClient.getShoppingListForLoggedUser()).ingredients);
      setLoading(false);
      toast.success('Ingredient removed from shopping list');
    } catch (err) {
      setLoading(false);
      toast.error(err.message); // Toast error message
    }
  };

  const handleAddManualIngredient = async () => {
    if (!newIngredient.trim()) return;
    try {
      setLoading(true);
      const ingredient = { name: newIngredient.trim() };
      await apiClient.addIngredientToDb(ingredient);
      setAvailableIngredients((await apiClient.getAllAvailableIngredients()).ingredients);
      setShoppingList((await apiClient.getShoppingListForLoggedUser()).ingredients);
      setNewIngredient('');
      setLoading(false);
      toast.success('Ingredient added to database');
    } catch (err) {
      setLoading(false);
      toast.error(err.message); // Toast error message
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Shopping List</h2>

      <div className="mb-8">
        <h4 className="text-xl font-medium mb-2">Add Ingredient (Manual)</h4>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Enter ingredient name"
          />
          <button
            onClick={handleAddManualIngredient}
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h4 className="text-xl font-medium mb-2">All Ingredients</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableIngredients.map((ingredient) => (
            <div key={ingredient.id} className="border border-gray-300 rounded shadow-lg p-4">
              <h5 className="text-lg font-semibold mb-2">{ingredient.name}</h5>
              <button
                onClick={() => handleAddIngredient(ingredient.id)}
                disabled={loading}
                className="bg-green-500 text-white py-2 px-4 rounded w-full disabled:bg-gray-300"
              >
                Add to Shopping List
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xl font-medium mb-2">Your Shopping List</h4>
        <ul className="space-y-4">
          {shoppingList.map((ingredient) => (
            <li
              key={ingredient.id}
              className="flex justify-between items-center border border-gray-300 rounded p-4"
            >
              <span className="text-lg">{ingredient.name}</span>
              <button
                onClick={() => handleRemoveIngredient(ingredient.id)}
                disabled={loading}
                className="bg-red-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover />
    </div>
  );
};

export default ShoppingListPage;
