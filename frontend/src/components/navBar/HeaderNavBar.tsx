'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import User from '@entities/User';
import { useEffect, useState } from 'react';
import apiClient from '@lib/apiClient';
import SearchModal from '@components/globals/SearchModal';
import {
  FiUser, FiLogIn, FiLogOut, FiHome, FiBookOpen, FiPlus, FiList, FiBarChart, FiCalendar
} from 'react-icons/fi';

const HeaderNavbar = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const t = useTranslations('NavBar');
  const user = User.getInstance();
  const isLoggedIn = user.isAuthenticated();
  const username = isLoggedIn ? user.getUser()?.username : null;

  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Detect window resize and update menu display for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md">
      <div className="max-w-screen-2xl flex justify-between items-center px-4 py-3">
        {/* Logo and Title Section */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('/')}>
          <img src="/images/logoPic.jpg" alt="Logo" className="w-16 h-16 rounded-full" />
          <h1 className="text-2xl font-bold transition-all duration-300 hover:text-[#C542FF]">Recipe Planner</h1>
        </div>

        {/* Navbar for larger screens */}
        {!isMobile && (
          <nav className="flex items-center space-x-6 ml-auto text-lg">
            {isLoggedIn ? (
              <>


                <button onClick={() => handleNavigation('/profile')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiUser /> <span className="ml-1">Profile</span>
                </button>
                <button onClick={() => handleNavigation('/my-recipes')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiBookOpen /> <span className="ml-1">My Recipes</span>
                </button>
                <button onClick={() => handleNavigation('/recipes')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiBookOpen /> <span className="ml-1">All Recipes</span>
                </button>
                <button onClick={() => handleNavigation('/add-recipe')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiPlus /> <span className="ml-1">Add Recipe</span>
                </button>
                <button onClick={() => handleNavigation('/shopping-list')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiList /> <span className="ml-1">My Shopping List</span>
                </button>
                <button onClick={() => handleNavigation('/recipe-stats')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiBarChart /> <span className="ml-1">Recipe Stats</span>
                </button>
                <button onClick={() => handleNavigation('/weekly-plan')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiCalendar /> <span className="ml-1">My Weekly Plan</span>
                </button>

                <button onClick={openModal}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiUser /> <span className="ml-1">Search for recipe</span>
                </button>


              </>
            ) : (
              <>
                <button onClick={() => handleNavigation('/login')}
                        className="flex items-center hover:text-[#C542FF] transition duration-300">
                  <FiLogIn /> <span className="ml-1">{t('login')}</span>
                </button>
                <button onClick={() => handleNavigation('/register')}
                        className="text-lg px-4 py-2 border border-[#C542FF] rounded-full hover:bg-[#C542FF] hover:text-gray-900 transition duration-300">
                  Sign Up
                </button>
              </>
            )}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button onClick={toggleMenu} className="text-white hover:text-[#C542FF] transition duration-300">
            <FiUser size={24} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="bg-gray-800 text-white">
          <ul className="flex flex-col items-center space-y-4 py-4 text-lg">
            {isLoggedIn ? (
              <>
                <li><button onClick={() => handleNavigation('/profile')} className="hover:text-[#C542FF]">Profile</button></li>
                <li><button onClick={() => handleNavigation('/my-recipes')} className="hover:text-[#C542FF]">My Recipes</button></li>
                <li><button onClick={() => handleNavigation('/recipes')} className="hover:text-[#C542FF]">All Recipes</button></li>
                <li><button onClick={() => handleNavigation('/add-recipe')} className="hover:text-[#C542FF]">Add Recipe</button></li>
                <li><button onClick={() => handleNavigation('/shopping-list')} className="hover:text-[#C542FF]">My Shopping List</button></li>
                <li><button onClick={() => handleNavigation('/recipe-stats')} className="hover:text-[#C542FF]">Recipe Stats</button></li>
                <li><button onClick={() => handleNavigation('/weekly-plan')} className="hover:text-[#C542FF]">My Weekly Plan</button></li>
                <li><button onClick={() => {
                  apiClient.logout();
                }} className="hover:text-[#C542FF]">Logout</button></li>
              </>
            ) : (
              <>
                <li><button onClick={() => handleNavigation('/login')} className="hover:text-[#C542FF]">Log In</button></li>
                <li><button onClick={() => handleNavigation('/register')} className="text-lg border border-[#C542FF] px-4 py-2 rounded-full hover:bg-[#C542FF] hover:text-gray-900 transition duration-300">Sign Up</button></li>
              </>
            )}
          </ul>
        </div>
      )}
      <SearchModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default HeaderNavbar;
