class User {
  private static instance: User;
  private user: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string;
    uuid: string;
    token: string;
  } | null = null;

  private constructor() {

    if (typeof window !== 'undefined' && window.sessionStorage) {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        this.user = JSON.parse(storedUser);
      }
    } else {
      console.warn('sessionStorage is not available in this environment.');
    }
  }

  // Method to get the singleton instance
  public static getInstance(): User {
    if (!User.instance) {
      User.instance = new User();
    }
    return User.instance;
  }

  // Method to set the user
  public setUser(
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    profileImageUrl: string,
    uuid: string,
    token: string
  ) {
    this.user = {
      id,
      username,
      firstName,
      lastName,
      email,
      profileImageUrl,
      uuid,
      token,
    };
    // Save the user data to localStorage
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  // Method to get the current user
  public getUser() {
    return this.user;
  }

  // Method to check if the user is logged in
  public isAuthenticated() {
    return this.user !== null;
  }

  // Optional: Method to clear user data (for logging out)
  public clearUser() {
    this.user = null;
    sessionStorage.removeItem('user');
  }
}

export default User;
