'use client';
import { useEffect, useState } from 'react';
import apiClient from '@lib/apiClient';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRecipes, setTotalRecipes] = useState(0);
  const [registrationsData, setRegistrationsData] = useState({});
  const [mealTypeData, setMealTypeData] = useState({});
  const [dishTypeData, setDishTypeData] = useState({});
  const [dietaryPreference, setDietaryPreference] = useState({});

  // Fetch data for the dashboard
  const fetchData = async () => {
    try {
      const usersResponse = await apiClient.get('users-count');
      setTotalUsers(usersResponse);

      const recipesResponse = await apiClient.get('recipes-total');
      setTotalRecipes(recipesResponse);

      const registrationsResponse = await apiClient.get('registrations-by-week');
      setRegistrationsData(registrationsResponse);

      const mealTypeResponse = await apiClient.get('recipes-by-meal-type');
      setMealTypeData(mealTypeResponse);

      const dietaryPreferenceResponse = await apiClient.get('recipes-by-dietary-preference');
      setDietaryPreference(dietaryPreferenceResponse);

      const dishTypeResponse = await apiClient.get('recipes-by-type');
      setDishTypeData(dishTypeResponse);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Chart data for registrations by week (Bar Chart)
  const registrationsChartData = {
    labels: Object.keys(registrationsData),
    datasets: [
      {
        label: 'Registrations',
        data: Object.values(registrationsData),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart data for meal types (Doughnut Chart)
  const mealTypeChartData = {
    labels: Object.keys(mealTypeData),
    datasets: [
      {
        label: 'Meal Types',
        data: Object.values(mealTypeData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(190,114,129,0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for dish types (Line Chart)
  const dishTypeChartData = {
    labels: Object.keys(dishTypeData),
    datasets: [
      {
        label: 'Dish Types',
        data: Object.values(dishTypeData),
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.1,
      },
    ],
  };

  // Chart data for dietary preferences (Doughnut Chart)
  const dietaryPreferenceChartData = {
    labels: Object.keys(dietaryPreference),
    datasets: [
      {
        label: 'Dietary Preferences',
        data: Object.values(dietaryPreference),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 text-primary font-weight-bold">Dashboard</h1>
        <p className="lead text-muted">Insights into users, recipes, and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card shadow-lg rounded-lg border-light">
            <div className="card-body">
              <h5 className="card-title text-success">Total Users</h5>
              <p className="display-4 text-info">{totalUsers}</p>
              <p className="text-muted">Users registered on the platform</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg rounded-lg border-light">
            <div className="card-body">
              <h5 className="card-title text-danger">Total Recipes</h5>
              <p className="display-4 text-warning">{totalRecipes}</p>
              <p className="text-muted">Total number of recipes available</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row">

        {/* Registrations by Week (Bar Chart) */}
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg rounded-lg border-light">
            <div className="card-body">
              <h5 className="card-title">Registrations by Week</h5>
              <Bar data={registrationsChartData} options={{ responsive: true }} height={200} />
            </div>
          </div>
        </div>

        {/* Dietary Preferences (Doughnut Chart) */}
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg rounded-lg border-light">
            <div className="card-body">
              <h5 className="card-title">Dietary Preferences</h5>
              <Doughnut data={dietaryPreferenceChartData} options={{ responsive: true }} height={200} />
            </div>
          </div>
        </div>

        {/* Meal Types (Doughnut Chart) */}
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg rounded-lg border-light">
            <div className="card-body">
              <h5 className="card-title">Meal Types</h5>
              <Doughnut data={mealTypeChartData} options={{ responsive: true }} height={200} />
            </div>
          </div>
        </div>

        {/* Dish Types (Line Chart) */}
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg rounded-lg border-light">
            <div className="card-body">
              <h5 className="card-title">Dish Types</h5>
              <Line data={dishTypeChartData} options={{ responsive: true }} height={200} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
