'use client';
import MaterialSymbol from '@components/globals/materialSymbol/MaterialSymbol';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import apiClient from '@lib/apiClient';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import User from '@entities/User';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import { toast, ToastContainer } from 'react-toastify';

export default function LoginPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null); // Add a state to hold the user

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();
  const searchParams = useSearchParams(); // To access query parameters
  // Use the useEffect hook to set the user on load
  useEffect(() => {
    const currentUser = User.getInstance(); // Get the current user instance
    setUser(currentUser); // Set the user state based on sessionStorage
  }, []); // Empty dependency array ensures this runs only on component mount

  // If user is already logged in, redirect to the home page
  useEffect(() => {
    if (user && user.getUser()?.token) { // Ensure user data is valid
      router.replace('/'); // Redirect to the home page ("/") if logged in
    }
  }, [user, router]); // Re-run whenever the user state changes

  useEffect(() => {
    // Check for success query parameter
    if (searchParams.get('success') === 'true') {
      toast.success('Registration successful! Please log in.');
    }
  }, [searchParams]); // Run when searchParams change (i.e., when URL changes)

  const handleRegisterClick = () => {
    router.push('/register');
  };


  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(
    () => !!error && (!email || !validateEmail(email)),
    [email, error]
  );

  const isInvalidPassword = React.useMemo(() => !!error, [error]);

  const handleLogin = async () => {
    try {
      setError(null); // Clear any previous errors
      await apiClient.login(email, password);
      window.location.href = '/';
      // Redirect or perform other actions on successful login
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="flex items-center justify-start min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/images/dark_theme.jpg")',
        backgroundSize: 'cover',  // Ensure the background image covers the entire div
        backgroundPosition: 'center', // Center the background image
        position: 'relative' // Make sure it is positioned correctly
      }}
    >
      <div className=" bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full mx-auto mt-16">
        {/* Text above the form */}
        <h2
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: '#EE5A8F' }} // Use your custom color for text
        >
          Log in and plan your shopping!
        </h2>

        {/* Error message */}
        {error && <div style={{ color: '#f30e4e' }} className="mb-4">{error}</div>}

        {/* Email input */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          variant="bordered"
          isInvalid={isInvalidEmail}
          color={isInvalidEmail ? 'danger' : 'default'}
          onValueChange={setEmail}
          className="mb-4"
          css={{
            borderColor: isInvalidEmail ? '#BE1846' : '#831834', // Custom border color
            color: '#831834', // Text color for input
          }}
        />

        {/* Password input */}
        <Input
          label="Password"
          type={isVisible ? 'text' : 'password'}
          placeholder="Enter your password"
          value={password}
          variant="bordered"
          onValueChange={setPassword}
          isInvalid={isInvalidPassword}
          color={isInvalidPassword ? 'danger' : 'default'}
          endContent={
            <Button
              isIconOnly
              onClick={() => toggleVisibility()}
              aria-label="toggle password visibility"
              className="focus:outline-none"
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-fuchsia-950 pointer-events-none " />
              ) : (
                <EyeFilledIcon className="text-2xl text-fuchsia-950 pointer-events-none" />
              )}
            </Button>

          }
          className="mb-4"
          css={{
            borderColor: isInvalidPassword ? '#BE1846' : '#831834', // Custom border color
            color: '#831834', // Text color for input
          }}
        />

        {/* Submit button */}
        <Button
          className="w-full mt-4"
          onClick={handleLogin}
          css={{
            backgroundColor: '#EE5A8F', // Custom background color for the button
            color: '#fff', // Button text color
            '&:hover': {
              backgroundColor: '#DB275F', // Hover effect for button
            },
          }}
        >
          Login
        </Button>

        {/* Link to the Register page */}
        <div className="mt-4 text-center">
          <span style={{ color: '#831834' }}>New Here? </span>
          <Link href="/register" className="text-neutralsWaterloo-900">
            Sign Up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
