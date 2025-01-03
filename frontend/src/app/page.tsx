'use client'; // This file will use hooks

import { Button } from '@nextui-org/react'; // NextUI button
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import apiClient from '@lib/apiClient';
import { toast, ToastContainer } from 'react-toastify';

import React, { useState, useEffect } from 'react';
import User from '@entities/User';


export default function Home() {
  const router = useRouter();

  // Simulating user login status (replace this with actual login status check)
  const [loggedIn, setLoggedIn] = useState(false); // Change this to true when the user is logged in


  // State to store top-rated recipes
  const [topRatedRecipes, setTopRatedRecipes] = useState([]);


  useEffect(() => {
    const user = User.getInstance().getUser(); // Get the singleton instance of User

    if (user !== null) {
      setLoggedIn(true); // If user exists, set loggedIn to true
    } else {
      setLoggedIn(false); // If no user, set loggedIn to false
    }
  }, []);


  useEffect(() => {
    if (!loggedIn) return; // Skip fetching if the user is not logged in
    const fetchTopRatedRecipes = async () => {
      try {
        const response = await apiClient.get("recipes/top-rated",{});

        console.log(response)

        setTopRatedRecipes(response);  // Assuming the response is an array of recipes
      } catch (error) {
        console.error(error);
        toast(error.message);  // Display the error to the user
      }
    };

    fetchTopRatedRecipes();
  }, [loggedIn]);  // Re-run this useEffect when loggedIn state changes


  return (
    <div className="container-fluid bg-light text-dark min-vh-100">
      {/* Header Section */}
      <div className="row align-items-center text-center text-md-start py-5"
           style={{ background: 'linear-gradient(to right, #ffe5e9, #ffded4)' }}>

        <div className="col-md-6 px-5">
          <h1 className="display-4 fw-bold text-dark">
            <i className="fas fa-utensils me-2"></i> Welcome to My Recipe App
          </h1>
          <p className="lead text-dark">
            Your ultimate platform to explore recipes, plan meals, and manage your culinary adventures.
            Register into our app and explore various recipes!
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src="/images/main-pic.jpg"
            className="img-fluid rounded shadow"
            alt="Delicious recipes"
            style={{ border: '5px solid #fff' }}
          />
        </div>
      </div>

      {/* Conditional Section */}
      {loggedIn ? (
        <div className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center fw-bold text-dark mb-5">Top 3 Rated Recipes</h2>
            <div className="row justify-content-center">
              {topRatedRecipes.map((recipe) => (
                <div key={recipe.id} className="col-md-4 mb-5">
                  <div className="card shadow-xl rounded-lg overflow-hidden border-0 transform-hover">
                    <div className="card-img-wrapper">
                      <img
                        src={recipe.imageUrl}
                        className="card-img-top object-cover"
                        alt={recipe.recipeName}
                        style={{ height: '200px', width: '100%' }}
                      />
                    </div>
                    <div className="card-body text-center p-4 bg-gradient-to-r from-indigo-200 to-blue-400">
                      <h5 className="card-title text-white fw-bold mb-3">{recipe.recipeName}</h5>

                      {/* Recipe Information */}
                      <div className="mb-4">
                        <div className="badge bg-dark text-white rounded-pill py-2 px-3 me-2">
                          <span className="small">Estimated Time</span><br />
                          <span className="fw-bold">{recipe.estimatedTime} min</span>
                        </div>
                        <div className="badge bg-info text-white rounded-pill py-2 px-3">
                          <span className="small">Creator</span><br />
                          <span className="fw-bold">{recipe.creatorUsername}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <span className="me-2 text-white">Rating:</span>
                        <div className="d-flex align-items-center">
                          {[...Array(5)].map((_, idx) => (
                            <i
                              key={idx}
                              className={`fas fa-star ${idx < Math.floor(recipe.averageRating) ? 'text-yellow-400' : 'text-muted'}`}
                            ></i>
                          ))}
                        </div>
                      </div>


                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      ) : (
        // Display "How It Works" Section if not logged in
        <div className="py-5 bg-white">
          <div className="container">
            <h2 className="text-center fw-bold text-dark mb-4">How It Works</h2>
            <div className="d-flex justify-content-center flex-wrap gap-5">
              {[
                { icon: 'search', color: 'bg-primary', title: 'Discover Recipes', text: 'Find recipes that suit your taste and dietary preferences.' },
                { icon: 'pencil-alt', color: 'bg-success', title: 'Create Recipes', text: 'Share your unique recipes with detailed instructions.' },
                { icon: 'shopping-cart', color: 'bg-warning', title: 'Shopping List', text: 'Add recipe ingredients to your personalized shopping list.' },
                { icon: 'calendar-alt', color: 'bg-info', title: 'Meal Plans', text: 'Plan your meals for the week and stay organized.' },
                { icon: 'ruler', color: 'bg-secondary', title: 'Adjust Sizes', text: 'Scale ingredient amounts based on the desired number of servings.' },
                { icon: 'filter', color: 'bg-dark', title: 'Search Recipes with Filters', text: 'Search for recipes using various filters to find the right dish.' }
              ].map((item, index) => (
                <div className="d-flex flex-column align-items-center" key={index} style={{ maxWidth: '150px' }}>
                  <div
                    className={`${item.color} text-white rounded-circle shadow`}
                    style={{
                      width: '80px',
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.3s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                    onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <i className={`fas fa-${item.icon} fa-lg`}></i>
                  </div>
                  <h5 className="mt-3">{item.title}</h5>
                  <p className="text-muted text-center">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Call-to-Action Section */}
      <div className="row align-items-center py-5" style={{ background: 'linear-gradient(to right, #ffecd2, #fcb69f)' }}>
        <div className="col-md-6 text-center">
          <img
            src="/images/healthy.jpg"
            className="img-fluid rounded shadow"
            alt="Meal planning"
            style={{ border: '5px solid #fff' }}
          />
        </div>
        <div className="col-md-6 px-5">
          <h2 className="fw-bold text-dark mb-3">Plan Your Meals with Ease</h2>
          <p className="text-dark">
            Use our tools to create weekly meal plans, organize ingredients, and simplify grocery shopping.
            With our app, eating healthy and delicious food has never been easier!
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
