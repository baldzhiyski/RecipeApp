'use client'; // This file will use hooks

import { Button } from '@nextui-org/react'; // NextUI button
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';

export default function Home() {
  const router = useRouter();

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

      {/* Workflow Section */}
      <div className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold text-dark mb-4">How It Works</h2>
          <div className="d-flex justify-content-center flex-wrap gap-5">
            {[
              { icon: 'search', color: 'bg-primary', title: 'Discover Recipes', text: 'Find recipes that suit your taste and dietary preferences.' },
              { icon: 'pencil-alt', color: 'bg-success', title: 'Create Recipes', text: 'Share your unique recipes with detailed instructions.' },
              { icon: 'shopping-cart', color: 'bg-warning', title: 'Shopping List', text: 'Add recipe ingredients to your personalized shopping list.' },
              { icon: 'calendar-alt', color: 'bg-info', title: 'Meal Plans', text: 'Plan your meals for the week and stay organized.' },
              { icon: 'ruler', color: 'bg-secondary', title: 'Adjust  Sizes', text: 'Scale ingredient amounts based on the desired number of servings.' },
              { icon: 'filter', color: 'bg-dark', title: 'Search Recipes with Filters', text: 'Search for recipes using various filters to find the right dish.' },
            ].map((item, index) => (
              <div className="d-flex flex-column align-items-center" key={index} style={{ maxWidth: '150px' }}>
                <div
                  className={`${item.color} text-white rounded-circle shadow`}
                  style={{
                    width: '80px', // Smaller icon size
                    height: '80px', // Smaller icon size
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <i className={`fas fa-${item.icon} fa-lg`}></i> {/* Smaller icon size */}
                </div>
                <h5 className="mt-3">{item.title}</h5>
                <p className="text-muted text-center">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
    </div>

  );
}
