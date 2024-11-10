'use client'; // Ensures that this component is executed only on the client side

import React, { useEffect, useState } from 'react';
import User from '@entities/User'; // Import User singleton to access the current user
import { Button } from '@nextui-org/react';

interface ProtectedPageProps {
  children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true); // Loading state for checking authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State to track authentication

  // This effect checks the user's authentication status
  useEffect(() => {
    const user = User.getInstance().getUser(); // Get current user from User singleton
    if (user) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
    }
    setLoading(false); // Stop loading after checking authentication status
  }, []);

  // Don't render if still loading or checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, display the button to go to login
  if (!isAuthenticated) {
    return (
      <div>
        <p>You are not logged in.</p>
        <Button onClick={() => window.location.href = '/login'}>Go to Login</Button>
      </div>
    );
  }

  // Render protected content if authenticated
  return <>{children}</>;
};

export default ProtectedPage;
