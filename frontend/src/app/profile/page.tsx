"use client";

import ProtectedPage from "@components/globals/ProtectedPage";
import User from "@entities/User";
import apiClient from "@lib/apiClient";
import { FiLogOut } from "react-icons/fi";
import UpdateProfileImageForm from "@components/UpdateProfileImageForm";

const UserProfile: React.FC = () => {
  const user = User.getInstance().getUser(); // Get the singleton instance of User

  const handleLogout = () => {
    apiClient.logout();
  };

  return (
    <ProtectedPage>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <div className="container mx-auto px-6 py-12">
          <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold text-teal-600">User Profile</h1>
            <p className="text-xl text-gray-600 mt-2">Update your profile details and preferences here.</p>
          </header>

          <section className="bg-white shadow-xl rounded-lg p-10 mb-12">
            <h2 className="text-3xl font-semibold text-teal-700 mb-8 text-center">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="font-medium text-gray-600 mb-2">Username:</div>
                <div className="text-xl text-teal-600">{user?.username || "N/A"}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600 mb-2">First Name:</div>
                <div className="text-xl text-teal-600">{user?.firstName || "N/A"}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600 mb-2">Last Name:</div>
                <div className="text-xl text-teal-600">{user?.lastName || "N/A"}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600 mb-2">Email:</div>
                <div className="text-xl text-teal-600">{user?.email || "N/A"}</div>
              </div>
              <div>
                <div className="font-medium text-gray-600 mb-2">UUID:</div>
                <div className="text-xl text-teal-600">{user?.uuid || "N/A"}</div>
              </div>

              {/* Profile Picture inside the same section */}
              <div className="col-span-1 md:col-span-2 mt-6 text-center">
                <div className="mb-4">
                  <div className="font-medium text-gray-600">Profile Picture:</div>
                  {/* Placeholder for the profile picture, this can be updated with the actual image */}
                  <div className="flex justify-center">
                    <img
                      src={user?.profileImageUrl || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-teal-600 shadow-lg"
                    />
                  </div>
                </div>
                <UpdateProfileImageForm />
              </div>
            </div>
          </section>

          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="flex items-center bg-teal-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-all duration-300"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </ProtectedPage>
  );
};

export default UserProfile;
