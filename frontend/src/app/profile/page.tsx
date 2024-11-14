"use client";

import ProtectedPage from '@components/globals/ProtectedPage';
import User from '@entities/User';
import apiClient from '@lib/apiClient';
import { Button } from '@nextui-org/react';
import { FiLogOut } from 'react-icons/fi';


const Recipes: React.FC = () => {

    const user = User.getInstance().getUser(); // Get the singleton instance of User

  return (
    <ProtectedPage>
      <div>Username: {user?.username}</div>
      <div>Firstname: {user?.firstName}</div>
      <div>Lastname: {user?.lastName}</div>
      <div>Email: {user?.email}</div>
      <div>UUID: {user?.uuid}</div>
      <button onClick={() => {
        apiClient.logout();
      }} className="flex items-center hover:text-[#C542FF] transition duration-300">
        <FiLogOut /> <span className="ml-1">Logout</span>
      </button>

    </ProtectedPage>
  );
};

export default Recipes;