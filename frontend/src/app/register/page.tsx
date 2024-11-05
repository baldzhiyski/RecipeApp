'use client';

import MaterialSymbol from '@components/globals/materialSymbol/MaterialSymbol';
import { Button, Input } from '@nextui-org/react';
import React from 'react';

export default function RegisterPage() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <Input label="Email" type="email" placeholder="Enter your name" />
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        endContent={
          <Button isIconOnly={true} onClick={toggleVisibility}>
            <MaterialSymbol name="search" />
          </Button>
        }
      />
    </div>
  );
}
