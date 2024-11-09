"use client";

import ProtectedPage from '@components/globals/ProtectedPage';
import User from '@entities/User';
import apiClient from '@lib/apiClient';
import { Button } from '@nextui-org/react';


const Recipes: React.FC = () => {

    const user = User.getInstance().getUser(); // Get the singleton instance of User

  return (
    <ProtectedPage>
        <div>Username: {user?.username}</div>
        <div>Firstname: {user?.firstName}</div>
        <div>Lastname: {user?.lastName}</div>
        <div>Email: {user?.email}</div>
        <div>UUID: {user?.uuid}</div>
        <Button
        onClick={() => {
            apiClient.logout();
        }}
        >
            Logout
        </Button>
    </ProtectedPage>
  );
};

export default Recipes;