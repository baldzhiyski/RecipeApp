import User from '@entities/User';

import {AddIngredientType,Ingredient } from "@types/IngredientType"

// lib/apiClient.ts
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchApiOptions {
  method?: RequestMethod;
  body?: Record<string, unknown> | FormData;
  headers?: Record<string, string>;
}

class ApiClient {
  private token: string | null = null;
  private baseUrl: string;

  constructor(baseUrl: string) {
    if (!baseUrl) {
      throw new Error('API base URL is not defined.');
    }
    this.baseUrl = baseUrl;

    if (typeof window !== 'undefined') {
      const savedToken = sessionStorage.getItem('authToken');
      const expiration = sessionStorage.getItem('authTokenExpiration');

      if (
        savedToken &&
        expiration &&
        new Date().getTime() < Number(expiration)
      ) {
        this.token = savedToken;
      } else {
        this.clearToken();
      }
    }
  }

  private setToken(token: string, expiresIn: number): void {
    this.token = token;
    // Use expiresIn directly as it's already in milliseconds
    const expirationTime = new Date().getTime() + expiresIn;
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('authTokenExpiration', expirationTime.toString());
  }

  private clearToken(): void {
    this.token = null;
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('authTokenExpiration');
  }
  private async fetchApi<T>(
    endpoint: string,
    { method = 'GET', body, headers = {} }: FetchApiOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const isFormData = body instanceof FormData;

    const config: RequestInit = {
      method,
      headers: {
        ...headers,
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        // Only add 'Content-Type' if the body is not FormData
        ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      },
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      // Try to parse the error response to retrieve errors
      let errorData;
      try {
        errorData = await response.json();
      } catch (error) {
        errorData = { message: 'An error occurred while parsing the error response.' };
      }

      // Check for specific and general errors and throw a detailed error
      const errorMessage = errorData.message || 'Failed to fetch data from the API';
      const fieldErrors = errorData.errors || {};
      const generalErrors = errorData.generalErrors || [];

      console.log(fieldErrors)
      console.log(generalErrors)
      // Throw an error containing all error details for the frontend to process
      throw { message: errorMessage, fieldErrors, generalErrors };
    }

    if (response.status === 204 || response.headers.get('Content-Length') === '0') {
      return; // No body to parse
    }
    // If response is okay, parse and return JSON data
    return response.json();
  }

  public async login(email: string, password: string): Promise<void> {
    const { token, expiresIn } = await this.fetchApi<{
      token: string;
      expiresIn: number;
    }>('auth/login', {
      method: 'POST',
      body: { email, password },
    });

    this.setToken(token, expiresIn);
    const userProfile = await this.fetchApi<{
      id: number;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImageUrl: string;
      uuid: string;
    }>('auth/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    User.getInstance().setUser(
      userProfile.id,
      userProfile.username,
      userProfile.firstName,
      userProfile.lastName,
      userProfile.email,
      userProfile.profileImageUrl,
      userProfile.uuid,
      token
    );
  }

  public async register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName: string,
    profileImageFile?: File
  ): Promise<void> {
    // Step 1: Register the user
    await this.fetchApi('auth/register', {
      method: 'POST',
      body: { firstName, lastName, username, password, confirmPassword, email },
    });
  }

  public async logout(): Promise<void> {
    // Optional: Call the API to invalidate the token on the server side if needed
    try {
      const token = User.getInstance().getUser()?.token;
      if (token) {
        await this.fetchApi('auth/logout', {
          method: 'POST',
        });
      }
    } catch (error) {
      console.error('Failed to log out on server:', error);
    }

    // Clear user data from the singleton and session storage
    User.getInstance().clearUser();
    this.clearToken();

    // Optional: Redirect to login or home page
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }

  public async get<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.fetchApi<T>(endpoint, { method: 'GET', headers });
  }

  public async post<T>(
    endpoint: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.fetchApi<T>(endpoint, { method: 'POST', body, headers });
  }

  public async put<T>(
    endpoint: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.fetchApi<T>(endpoint, { method: 'PUT', body, headers });
  }

  public async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.fetchApi<T>(endpoint, { method: 'DELETE', headers });
  }

  // Method to upload the profile image
  public async uploadProfileImage(formData: FormData): Promise<{ imageUrl: string }> {
    try {
      const response = await this.fetchApi<{ imageUrl: string }>('upload-profile-image', {
        method: 'POST',
        body: formData, // Send the raw FormData directly
      });

      // Check if response is OK
      if (!response || !response.imageUrl) {
        throw new Error('Image upload failed or image URL not found.');
      }

      return response;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error; // Re-throw or handle error
    }
  }

  public async getAllAvailableIngredients(): Promise<{ ingredients: Array<Ingredient> }> {
    return this.fetchApi<{ ingredients: Array<Ingredient> }>(`ingredients`, {
      method: 'GET',
    });
  }

  public async addIngredientToDb(ingredient: AddIngredientType): Promise<{ ingredients: Array<Ingredient> }> {
    return this.fetchApi<{ ingredients: Array<Ingredient> }>(`ingredients/add`, {
      method: 'POST',
      body: ingredient
    });
  }


  public async addIngredientToShoppingList(ingredientId: string | number): Promise<{ ingredients: Array<Ingredient> }> {
    return this.fetchApi<{ ingredients: Array<Ingredient> }>(`${ingredientId}/add-to-list`, {
      method: 'POST',
    });
  }


  // Remove ingredient from shopping list

  public async removeIngredientFromList(ingredientId: string | number): Promise<{ ingredients: Array<Ingredient> }> {
    return this.fetchApi<{ ingredients: Array<Ingredient> }>(`${ingredientId}/remove-ingredient`, {
      method: 'DELETE',
    });
  }

  public async getShoppingListForLoggedUser() : Promise<{ingredients : Array<Ingredient> }> {
    return this.fetchApi<{ ingredients: Array<Ingredient> }>(`shopping-list`, {
      method: 'GET',
    });
  }
  public async postRecipe(
    endpoint: string,
    formData: FormData,
    headers: Record<string, string> = {}
  ): Promise<void> {
    try {
      // Ensure headers have the Authorization token if it's available
      const configHeaders = {
        ...headers,
        ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      };

      const url = `${this.baseUrl}/${endpoint}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: configHeaders, // Include headers with Authorization
        body: formData, // Send FormData directly
      });

      // Check if the response is successful
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          errorData = { message: 'An error occurred while parsing the error response.' };
        }

        const errorMessage = errorData.message || 'Failed to upload the recipe';
        const fieldErrors = errorData.errors || {};
        const generalErrors = errorData.generalErrors || [];

        // Log or handle detailed error
        throw { message: errorMessage, fieldErrors, generalErrors };
      }

      // Handle successful response
      if (response.status === 204 || response.headers.get('Content-Length') === '0') {
        return; // No body to parse
      }

      // Parse response data if needed
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error uploading recipe:', error);
      throw error; // Rethrow or handle error as needed
    }
  }



}

// Create a singleton instance and export it
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL!);
export default apiClient;
