'use client'; // This file will use hooks

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import User from '@entities/User';

const HeaderNavbar = () => {
  const t = useTranslations('NavBar');
  const user = User.getInstance(); // Get the singleton instance of User
  const isLoggedIn = user.isAuthenticated();
  const username = isLoggedIn ? user.getUser()?.username : null;

  const router = useRouter();

  const handleProfileClick = () => {
    router.push('/profile');
  };

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleTitleClick = () => {
    router.push('/');
  };

  return (
    <header className="hidden md:flex justify-between items-center bg-gray-800 text-white p-4">
      <h1
        onClick={handleTitleClick}
        className="text-xl font-bold cursor-pointer"
      >
        My SPA
      </h1>
      <nav>
        <ul className="flex space-x-4">
          {isLoggedIn ? (
            <li onClick={handleProfileClick}>
              <div>Hello, {username}!</div>
            </li>
          ) : (
            <li onClick={handleLoginClick}>{t('login')}</li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
