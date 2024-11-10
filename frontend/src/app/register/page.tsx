'use client';

import MaterialSymbol from '@components/globals/materialSymbol/MaterialSymbol';
import apiClient from '@lib/apiClient';
import { Button, Checkbox, CheckboxGroup, Input } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isVisible2nPassword, setIsVisible2nPassword] = React.useState(false);

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [verifyPassword, setVerifyPassword] = React.useState<string>('');
  const [forname, setForname] = React.useState<string>('');
  const [surename, setSurename] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [waitForRegister, setWaitForRegister] = React.useState<boolean>(false);

  const router = useRouter();

  const toggleVisibility2ndPassword = () =>
    setIsVisible2nPassword(!isVisible2nPassword);

  interface PasswordRequirement {
    id: string;
    label: string;
    check: (password: string) => boolean;
  }

  // Define the requirements
  const passwordRequirements: PasswordRequirement[] = [
    {
      id: 'uppercase',
      label: 'At least one uppercase letter',
      check: (password) => /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter',
      check: (password) => /[a-z]/.test(password),
    },
    {
      id: 'digit',
      label: 'At least one digit',
      check: (password) => /\d/.test(password),
    },
    {
      id: 'special',
      label: 'At least one special character',
      check: (password) => /[\W_]/.test(password),
    },
    {
      id: 'minLength',
      label: 'Minimum length of 6 characters',
      check: (password) => password.length >= 6,
    },
  ];

  const handleRegister = async () => {
    setWaitForRegister(true);
    try {
      // Simulate API call or actual API call
      await apiClient.register(
        username,
        email,
        password,
        verifyPassword,
        forname,
        surename
      );

      // After successful registration, redirect to profile page
      router.push('/profile');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error (e.g., show a toast notification or error message)
    } finally {
      setWaitForRegister(false); // Set loading state back to false
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validateEmail = (email: string) =>
    email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalidEmail = React.useMemo(() => {
    if (email === '') return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  // Memoized password validation logic
  const isInvalidPassword = React.useMemo(() => {
    const unmetRequirements = passwordRequirements.filter(
      (req) => !req.check(password)
    );
    return unmetRequirements.length > 0;
  }, [password]);

  // Memoized password validation logic
  const isInvalid2ndPassword = React.useMemo(() => {
    if (password === verifyPassword) return false;

    return true;
  }, [password, verifyPassword]);

  // Get the ids of the unmet requirements
  const checkedRequirements = passwordRequirements
    .filter((req) => req.check(password))
    .map((req) => req.id);

  return (
    <div>
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        variant="bordered"
        isInvalid={isInvalidEmail}
        color={isInvalidEmail ? 'danger' : 'default'}
        onValueChange={setEmail}
      />
      <Input
        label="Username"
        type="text"
        placeholder="Enter your Username"
        value={username}
        variant="bordered"
        onValueChange={setUsername}
      />
      <Input
        label="Forname"
        type="text"
        placeholder="Enter your name"
        value={forname}
        variant="bordered"
        onValueChange={setForname}
      />
      <Input
        label="Surname"
        type="text"
        placeholder="Enter your name"
        value={surename}
        variant="bordered"
        onValueChange={setSurename}
      />
      <Input
        label="Password"
        type={isVisible ? 'text' : 'password'}
        value={password}
        variant="bordered"
        isInvalid={password ? isInvalidPassword : false}
        placeholder="Enter your password"
        onValueChange={setPassword}
        endContent={
          <Button isIconOnly={true} onClick={toggleVisibility}>
            <MaterialSymbol name="search" />
          </Button>
        }
      />
      <Input
        label="Verify Password"
        type={isVisible2nPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        value={verifyPassword}
        variant="bordered"
        onValueChange={setVerifyPassword}
        isInvalid={isInvalid2ndPassword}
        color={isInvalid2ndPassword ? 'danger' : 'default'}
        endContent={
          <Button isIconOnly={true} onClick={toggleVisibility2ndPassword}>
            <MaterialSymbol name="search" />
          </Button>
        }
      />
      <Button onClick={handleRegister} disabled={waitForRegister}>
        {waitForRegister ? 'Registering...' : 'Register'}
      </Button>
      <div className="flex flex-col gap-3">
        <CheckboxGroup value={checkedRequirements} isDisabled>
          {passwordRequirements.map((req) => (
            <Checkbox key={req.id} value={req.id} radius="full">
              {req.label}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
}
