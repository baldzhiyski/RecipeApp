'use client';
import MaterialSymbol from '@components/globals/materialSymbol/MaterialSymbol';
import { Button, Input } from '@nextui-org/react';
import apiClient from '@lib/apiClient';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import user from '@entities/User';


export default function LoginPage() {

  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  // If user is already logged in, redirect to the home page
  useEffect(() => {
    if (user) {
      router.replace('/'); // Redirect to the home page ("/") if logged in
    }
  }, [user, router]);
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
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message here */}

      <Input
        label="Email"
        type="email"
        placeholder="Enter your name"
        value={email}
        variant="bordered"
        isInvalid={isInvalidEmail}
        color={isInvalidEmail ? 'danger' : 'default'}
        onValueChange={setEmail}
      />
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
          <Button isIconOnly={true} onClick={toggleVisibility}>
            <MaterialSymbol name="search" />
          </Button>
        }
      />
      <div className="flex flex-row">
        <div>New Here?</div>
        <div onClick={handleRegisterClick}>Register</div>
      </div>

      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}