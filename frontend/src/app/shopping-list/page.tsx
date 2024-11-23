'use client';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '@lib/apiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ShoppingList.css'; // Import custom CSS
import { Ingredient } from '@types/IngredientType';

const ShoppingListPage = () => {
  const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
  const [shoppingList, setShoppingList] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchShoppingList = async () => {
      try {
        const shoppingListData = await apiClient.getShoppingListForLoggedUser();
        setShoppingList(shoppingListData.ingredients);
      } catch (err) {
        toast.error('Failed to fetch shopping list');
      }
    };

    const fetchAvailableIngredients = async () => {
      try {
        const ingredientsData = await apiClient.getAllAvailableIngredients();
        setAvailableIngredients(ingredientsData.ingredients);
      } catch (err) {
        toast.error('Failed to fetch ingredients');
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
      toast.error(err.message);
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
      toast.error(err.message);
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
      toast.error(err.message);
    }
  };

  const filteredIngredients = availableIngredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div id="shopping-list-page" >
      {/* All page content here */}
      <div className="container mt-5">
        <h2 className="text-center mb-5 text-primary">Shopping List</h2>

        {/* Add Ingredient Form */}
        <div className="card shadow-lg p-4 mb-4">
          <div className="card-body">
            <h4 className="card-title text-secondary">Add Ingredient (Manual)</h4>
            <div className="input-group">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                className="form-control custom-input"
                placeholder="Enter ingredient name"
              />
              <button
                onClick={handleAddManualIngredient}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Available Ingredients */}
          <div className="col-lg-8 mb-4">
            <h4 className="mb-3 text-secondary">All Ingredients</h4>
            <input
              type="text"
              className="form-control custom-input mb-3"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="d-flex flex-wrap gap-3 overflow-auto ingredient-grid">
              {filteredIngredients.map((ingredient) => (
                <div key={ingredient.id} className="card ingredient-card">
                  <div className="card-body text-center">
                    <h5 className="card-title text-truncate">{ingredient.name}</h5>
                    <button
                      onClick={() => handleAddIngredient(ingredient.id)}
                      disabled={loading}
                      className="btn btn-dark btn-sm w-100"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
              {filteredIngredients.length === 0 && (
                <p className="text-center text-muted">No ingredients found</p>
              )}
            </div>
          </div>

          {/* Shopping List */}
          <div className="col-lg-4">
            <h4 className="mb-3 text-secondary">Your Shopping List</h4>
            <div className="list-group shopping-list overflow-auto">
              {shoppingList.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="list-group-item d-flex justify-content-between align-items-center shopping-list-item"
                >
                  <span className="ingredient-name">{ingredient.name}</span>
                  <button
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                    disabled={loading}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default ShoppingListPage;
