'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import User from '@entities/User';
import { useEffect, useState } from 'react';
import apiClient from '@lib/apiClient';
import SearchModal from '@components/globals/SearchModal';
import {
  FiUser,
  FiLogIn,
  FiLogOut,
  FiHome,
  FiBookOpen,
  FiPlus,
  FiList,
  FiBarChart,
  FiCalendar,
  FiHeart,
  FiExternalLink,
  FiTrash,
} from 'react-icons/fi';
import Recipes from '@/app/recipes/page';
import { toast } from 'react-toastify';

const HeaderNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const t = useTranslations('NavBar');
  const user = User.getInstance();
  const isLoggedIn = user.isAuthenticated();
  const username = isLoggedIn ? user.getUser()?.username : null;
  const router = useRouter();

  // Modal Handlers
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Menu Handlers
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleNavigation = (path) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  // Favorites Dropdown Handlers
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const fetchFavorites = async () => {
    try {
      const response = await apiClient.get('recipes/favourites');
      setFavorites(response);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await apiClient.delete(`recipes/favourites/${id}`);
      toast.warn(`Recipe removed to favorites!`);
      setFavorites(favorites.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const handleViewDetails = (id, recipeName) => {
    // Redirect to the recipe page with the search term as a query parameter
    router.push(`/recipes?search=${recipeName}`);
  };

  useEffect(() => {
    if (isDropdownOpen) fetchFavorites();
  }, [isDropdownOpen]);

  // Window Resize Handler
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md">
      <div className="max-w-screen-2xl flex justify-between items-center px-4 py-3">
        {/* Logo and Title */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <img
            src="/images/logoPic.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-2xl font-bold transition-all duration-300 hover:text-[#C542FF]">
            Recipe Planner
          </h1>
        </div>

        {/* Navbar for Desktop */}
        {!isMobile && (
          <nav className="flex items-center space-x-6 ml-auto text-lg">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="flex items-center hover:text-[#C542FF] transition duration-300"
                >
                  <FiUser /> <span className="ml-1">Profile</span>
                </button>
                <button
                  onClick={() => handleNavigation('/recipes')}
                  className="flex items-center hover:text-[#C542FF] transition duration-300"
                >
                  <FiBookOpen /> <span className="ml-1">All Recipes</span>
                </button>
                <button
                  onClick={() => handleNavigation('/shopping-list')}
                  className="flex items-center hover:text-[#C542FF] transition duration-300"
                >
                  <FiList /> <span className="ml-1">My Shopping List</span>
                </button>
                <button
                  onClick={() => handleNavigation('/recipes-stats')}
                  className="flex items-center hover:text-[#C542FF] transition duration-300"
                >
                  <FiBarChart /> <span className="ml-1">Recipe Stats</span>
                </button>
                <button
                  onClick={() => handleNavigation('/weekly-plan')}
                  className="flex items-center hover:text-[#C542FF] transition duration-300"
                >
                  <FiCalendar /> <span className="ml-1">My Weekly Plan</span>
                </button>

                {/* Favorites Dropdown */}
                <div className="relative">
                  <button
                    className="relative flex items-center hover:text-[#C542FF] transition"
                    onClick={toggleDropdown}
                  >
                    <FiHeart className="mr-1" />
                    {/* Favorites Count Badge */}
                    {favorites.length > 0 && (
                      <div
                        className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-2 -translate-y-2">
                        {favorites.length}
                      </div>
                    )}
                    Favorites
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-md shadow-lg z-50">
                      <ul className="divide-y divide-gray-700">
                        {favorites.length > 0 ? (
                          favorites.map((recipe) => (
                            <li key={recipe.id} className="flex items-center p-3">
                              <img
                                src={recipe.imageUrl}
                                alt={recipe.recipeName}
                                className="w-10 h-10 rounded mr-2"
                              />
                              <span className="flex-1 truncate">
                {recipe.recipeName}
              </span>
                              <button
                                onClick={() => handleViewDetails(recipe.id,recipe.recipeName)}
                                className="text-green-400 hover:text-green-300 mx-1"
                              >
                                <FiExternalLink />
                              </button>
                              <button
                                onClick={() => handleRemoveFavorite(recipe.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <FiTrash />
                              </button>
                            </li>
                          ))
                        ) : (
                          <li className="p-4 text-center text-gray-400">
                            No favorites yet.
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>


              </>
            ) : (
              <>
                <button
                  onClick={() => handleNavigation('/login')}
                  className="flex items-center hover:text-[#C542FF] transition duration-300"
                >
                  <FiLogIn /> <span className="ml-1">{t('login')}</span>
                </button>
                <button
                  onClick={() => handleNavigation('/register')}
                  className="text-lg px-4 py-2 border border-[#C542FF] rounded-full hover:bg-[#C542FF] hover:text-gray-900 transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="text-white hover:text-[#C542FF] transition duration-300"
          >
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
                <li>
                  <button
                    onClick={() => handleNavigation('/profile')}
                    className="hover:text-[#C542FF]"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/my-recipes')}
                    className="hover:text-[#C542FF]"
                  >
                    My Recipes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/recipes')}
                    className="hover:text-[#C542FF]"
                  >
                    All Recipes
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/add-recipe')}
                    className="hover:text-[#C542FF]"
                  >
                    Add Recipe
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/shopping-list')}
                    className="hover:text-[#C542FF]"
                  >
                    My Shopping List
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/recipes-stats')}
                    className="hover:text-[#C542FF]"
                  >
                    Recipe Stats
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation('/weekly-plan')}
                    className="hover:text-[#C542FF]"
                  >
                    My Weekly Plan
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => apiClient.logout()}
                    className="hover:text-[#C542FF]"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => handleNavigation('/login')} className="hover:text-[#C542FF]">Log In</button>
                </li>
                <li>
                  <button onClick={() => handleNavigation('/register')}
                          className="text-lg border border-[#C542FF] px-4 py-2 rounded-full hover:bg-[#C542FF] hover:text-gray-900 transition duration-300">Sign
                    Up
                  </button>
                </li>
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
