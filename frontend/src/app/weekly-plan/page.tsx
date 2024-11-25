'use client';
import React, { useState, useEffect } from 'react';
import './WeeklyPlan.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import apiClient from '@lib/apiClient';

const WeeklyPlan: React.FC = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [weeklyPlan, setWeeklyPlan] = useState<any>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [recipesResponse, planResponse] = await Promise.all([
          apiClient.get('recipes'),
          apiClient.get('weekly-plan'),
        ]);
        setRecipes(recipesResponse);

        if (planResponse.mealPlanRecipeDtos) {
          organizeWeeklyPlan(planResponse.mealPlanRecipeDtos);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedMealType) {
      setFilteredRecipes(recipes.filter((recipe) => recipe.mealType === selectedMealType));
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedMealType, recipes]);

  const organizeWeeklyPlan = (mealPlanDto: any) => {
    const organizedPlan: any = {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
      Sunday: [],
    };

    mealPlanDto.forEach((entry: any) => {
      const { dayOfWeek, recipe } = entry;
      const dayOfWeekParsed = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1).toLowerCase();
      if (!organizedPlan[dayOfWeekParsed]) {
        organizedPlan[dayOfWeekParsed] = [];
      }
      organizedPlan[dayOfWeekParsed].push(recipe);
    });

    setWeeklyPlan(organizedPlan);
  };

  const handleAddRecipe = async (day: string, recipeId: number) => {
    try {
      await apiClient.post(`meal-plans/${day.toLowerCase()}/add-recipe?recipeId=${recipeId}&mealType=${selectedMealType}`, {}, {});
      await fetchUpdatedPlan();
      triggerToast(`Recipe added to ${selectedMealType} for ${day}`);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleRemoveRecipe = async (day: string, recipeId: number, mealType: string) => {
    try {
      await apiClient.post(`meal-plans/${day.toLowerCase()}/remove-recipe?recipeId=${recipeId}&mealType=${mealType}`, {}, {});
      await fetchUpdatedPlan();
      triggerToast(`Recipe removed from ${mealType} for ${day}`);
    } catch (error) {
      console.error('Error removing recipe:', error);
    }
  };

  const fetchUpdatedPlan = async () => {
    try {
      const response = await apiClient.get('weekly-plan');
      if (response.mealPlanRecipeDtos) {
        organizeWeeklyPlan(response.mealPlanRecipeDtos);
      }
    } catch (error) {
      console.error('Error fetching updated weekly plan:', error);
    }
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="weekly-plan">
      <div className="container ">
        <h1 className="text-center mb-5">My Weekly Plan</h1>

        {/* Weekly Plan */}
        <div className="row">
          {Object.keys(weeklyPlan).map((day) => (
            <div key={day} className="col-md-4 mb-4">
              <div className="card shadow border-0">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">{day}</h5>
                </div>
                <div className="card-body">
                  {/* Meal Types */}
                  {['BREAKFAST', 'LUNCH', 'DINNER'].map((mealType) => (
                    <div key={mealType} className="mb-3">
                      <h6 className="text-uppercase font-weight-bold">{mealType}</h6>
                      {weeklyPlan[day]
                        .filter((recipe: any) => recipe.mealType === mealType)
                        .map((recipe: any) => (
                          <div key={recipe.id} className="d-flex align-items-center mb-2 p-2 border rounded bg-light">
                            <div className="flex-grow-1">
                              <h6 className="mb-1">{recipe.recipeName}</h6>
                              <small className="text-muted">{recipe.dishType}</small>
                            </div>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleRemoveRecipe(day, recipe.id, mealType)}
                            >
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        ))}
                      <button
                        className="btn btn-outline-primary btn-sm mt-2"
                        onClick={() => {
                          setSelectedDay(day);
                          setSelectedMealType(mealType);
                          setIsRecipeModalOpen(true);
                        }}
                      >
                        <i className="bi bi-plus"></i> Add {mealType}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Modal */}
        {isRecipeModalOpen && (
          <div className="modal show fade" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Select a Recipe for {selectedDay} - {selectedMealType}</h5>
                  <button type="button" className="btn-close" onClick={() => setIsRecipeModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={selectedMealType}
                      onChange={(e) => setSelectedMealType(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="BREAKFAST">Breakfast</option>
                      <option value="LUNCH">Lunch</option>
                      <option value="DINNER">Dinner</option>
                    </select>
                  </div>
                  <div className="row">
                    {filteredRecipes.map((recipe) => (
                      <div key={recipe.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm border-0">
                          <div className="card-body text-center">
                            <h5>{recipe.recipeName}</h5>
                            <p className="card-text">{recipe.dishType}</p>
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleAddRecipe(selectedDay, recipe.id);
                                setIsRecipeModalOpen(false);
                              }}
                            >
                              Add to {selectedMealType}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
            <div className="toast show bg-success text-white">
              <div className="toast-body">
                {toastMessage}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeeklyPlan;
