"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import apiClient from '@lib/apiClient';
import { useRouter } from 'next/navigation';


export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value});
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, username, password, confirmPassword } = formData;

    const validationErrors: Record<string, string> = {};
    if (!firstName) validationErrors.firstName = "First name is required.";
    if (!lastName) validationErrors.lastName = "Last name is required.";
    if (!email) validationErrors.email = "Email is required.";
    if (!username) validationErrors.username = "Username is required.";
    if (!password) validationErrors.password = "Password is required.";
    if (password !== confirmPassword)
      validationErrors.confirmPassword = "Passwords do not match.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await apiClient.register(username, email, password, confirmPassword, firstName, lastName);
      router.push('/login?success=true');

    } catch (err: any) {
      console.warn(err);
      // Display all error messages returned from the server
      if (err.fieldErrors) {
        console.log(err.fieldErrors);

        const fieldErrors = err.fieldErrors;
        const uniqueErrors = new Set(Object.values(fieldErrors));

        // Iterate directly over the Set
        uniqueErrors.forEach((error) => {
          toast.error(error); // Display each unique error
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (

    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Section with Static Pictures */}
        <div className="col-md-6 text-center">
          <h2 className="mb-4" style={{ color: "#6D1093" }}>
            <i className="fas fa-utensils"></i> Join Our Recipe Community!
          </h2>
          <p className="mb-4" style={{ color: "#6D1093" }}>
            Share your best recipes, discover new flavors, and get inspired by a world of culinary delights!
          </p>
          <img
            src="/images/notebook.avif"
            alt="Delicious Pasta"
            className="rounded-circle shadow"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
          <img
            src="/images/notebook2.avif"
            alt="Tasty Dessert"
            className="rounded-circle shadow mt-3"
            style={{ width: "300px", height: "300px", objectFit: "cover" }}
          />
        </div>

        {/* Right Section - Registration Form */}
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4" style={{ color: "#6D1093" }}>
              <i className="fas fa-user-plus"></i> Register
            </h2>
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label" style={{ color: "#6D1093" }}>
                  <i className="fas fa-user"></i> First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              {/* Last Name */}
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label" style={{ color: "#6D1093" }}>
                  <i className="fas fa-user-tag"></i> Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{ color: "#6D1093" }}>
                  <i className="fas fa-envelope"></i> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              {/* Username */}
              <div className="mb-3">
                <label htmlFor="username" className="form-label" style={{ color: "#6D1093" }}>
                  <i className="fas fa-user-circle"></i> Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{ color: "#6D1093" }}>
                  <i className="fas fa-lock"></i> Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                  </button>
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label" style={{ color: '#6D1093' }}>
                  <i className="fas fa-lock"></i> Confirm Password
                </label>
                <div className="input-group">
                  <input
                    type={showCnfPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowCnfPassword(!showCnfPassword)}
                  >
                    {showCnfPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                  </button>
                  {errors.confirmPassword &&
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                  }
                </div>

              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <button type="submit" className="btn" style={{ backgroundColor: '#6D1093', color: '#fff' }}>
                <i className="fas fa-paper-plane"></i> Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>

  );
}
