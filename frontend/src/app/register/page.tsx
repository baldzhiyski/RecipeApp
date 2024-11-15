"use client";
import MaterialSymbol from '@components/globals/materialSymbol/MaterialSymbol';
import apiClient from '@lib/apiClient';
import { Button, Input } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import User from '@entities/User';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';

export default function RegisterPage() {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [verifyPassword, setVerifyPassword] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [waitForRegister, setWaitForRegister] = React.useState<boolean>(false);

  // State to handle password visibility
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showVerifyPassword, setShowVerifyPassword] = React.useState<boolean>(false);

  // Error messages from the backend
  const [errorMessages, setErrorMessages] = React.useState<Record<string, string>>({});
  const [generalErrors, setGeneralErrors] = React.useState<string[]>([]);

  const router = useRouter();

  // If user is already logged in, redirect to the home page
  useEffect(() => {
    const currentUser = User.getInstance().getUser(); // Get the current user instance
    if (currentUser && currentUser.token) { // Check if the user is logged in
      router.replace('/'); // Redirect to the home page ("/") if logged in
    }
  }, [router]); // Only run this effect when the component mounts or router changes

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleRegister = async () => {
    setWaitForRegister(true);
    setErrorMessages({});
    setGeneralErrors([]);
    try {
      const response = await apiClient.register(username, email, password, verifyPassword, firstName, lastName);

      // Redirect if registration is successful
      router.push('/');
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.fieldErrors) {
        setErrorMessages(error.fieldErrors);
      }
      if (error.generalErrors) {
        setGeneralErrors(error.generalErrors);
      }
    } finally {
      setWaitForRegister(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 border shadow rounded-lg">
      <h2 className="text-center text-3xl font-semibold mb-6">Create Account</h2>

      <Input
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        variant="bordered"
        color={errorMessages.firstName ? 'danger' : 'default'}

      />

      <Input
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        variant="bordered"
        color={errorMessages.lastName ? 'danger' : 'default'}

      />

      <Input
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        variant="bordered"
        color={errorMessages.username ? 'danger' : 'default'}

      />

      <Input
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        variant="bordered"
        color={errorMessages.email ? 'danger' : 'default'}
      />

      <Input
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        variant="bordered"
        color={errorMessages.password ? 'danger' : 'default'}
        helperText={errorMessages.password || ''}
        endContent={
          <Button
            isIconOnly
            onClick={() => setShowPassword(prev => !prev)}
            aria-label="toggle password visibility"
            className="focus:outline-none"
          >
            {showPassword ? (
              <EyeSlashFilledIcon className="text-2xl text-fuchsia-950 pointer-events-none " />
            ) : (
              <EyeFilledIcon className="text-2xl text-fuchsia-950 pointer-events-none" />
            )}
          </Button>
        }
      />

      <Input
        label="Confirm Password"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
        type={showVerifyPassword ? 'text' : 'password'}
        variant="bordered"
        color={errorMessages.confirmPassword ? 'danger' : 'default'}

        endContent={
          <Button
            isIconOnly
            onClick={() => setShowVerifyPassword(prev => !prev)}
            aria-label="toggle password visibility"
            className="focus:outline-none"
          >
            {showVerifyPassword ? (
              <EyeSlashFilledIcon className="text-2xl text-fuchsia-950 pointer-events-none " />
            ) : (
              <EyeFilledIcon className="text-2xl text-fuchsia-950 pointer-events-none" />
            )}
          </Button>
        }
      />

      <Button
        onClick={handleRegister}
        disabled={waitForRegister}
        fullWidth
        className="mt-4"
      >
        {waitForRegister ? 'Registering...' : 'Register'}
      </Button>

      {/* Display all error messages at once */}
      {(Object.values(errorMessages).length > 0 || generalErrors.length > 0) && (
        <div className="mt-4 text-red-600">
          {Object.entries(errorMessages).map(([field, message], index) => (
            <p key={index}>{message}</p>
          ))}
          {generalErrors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
}
