"use client";

import React, { useState } from "react";
import FileUpload from "@components/FileUpload";
import User from "@entities/User";
import apiClient from "@lib/apiClient";
import { toast } from "sonner";

export default function UpdateProfileImageForm() {
  const user = User.getInstance().getUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoChange = async (file: File) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("profileImage", file,file.name); // Ensure correct form field name

    console.log(formData);

    try {
      console.log('FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      // Let axios set the correct 'Content-Type' header
      const response = await apiClient.uploadProfileImage(formData);
      const uploadedImageUrl = response.imageUrl; // The URL returned from the backend

      console.log("Image : " + uploadedImageUrl);
      User.getInstance().setProfileImageUrl(uploadedImageUrl);
      window.location.reload(); // This will refresh the page and update the UI with the new image URL
      toast.success("Profile picture updated successfully");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred while uploading the image.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const profileImageUrl = "https://via.placeholder.com/150";
  const userInitial = user?.firstName?.[0] || "?";

  return (
    <div className="flex gap-4 flex-col">
      <label className="text-sm font-medium text-gray-700">Profile Picture</label>
      <FileUpload
        onFileSelect={(file) =>{
          console.log(file);
          handleLogoChange(file)}}
        allowedTypes={["image/png", "image/jpg", "image/jpeg"]}
        onValidationError={(err) => {
          toast.error(err);
        }}
        disabled={isLoading} // Disable the upload button when processing
      >
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="relative w-16 h-16">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="User Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                {userInitial}
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-full">
                <svg
                  className="w-6 h-6 text-gray-500 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            )}
          </div>
          <span className="text-sm text-gray-500">
            Click to upload a new profile picture
          </span>
        </div>
      </FileUpload>
    </div>
  );
}
